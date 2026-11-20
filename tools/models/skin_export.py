# Shadow -> skinned GLB with chosen clips (run: python3 -I export_skinned.py BLEND OUTDIR)
import bpy, bmesh, sys, os, json, numpy as np
from mathutils import Vector
BLEND, OUT = sys.argv[1], sys.argv[2]; os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=BLEND)
scn = bpy.context.scene; rig = bpy.data.objects['TripoBase_Rig']; ad = rig.animation_data
CLIPS = ['Rifle Aiming Idle', 'Rifle Walk', 'Rifle Run', 'Sprint', 'Walking Backwards', 'Walk Strafe Left', 'Walk Strafe Right', 'Left Strafe', 'Right Strafe',
         'Crouch Idle', 'Crouch Walk Forward', 'Falling Idle', 'Reloading', 'Hit Reaction']
for t in list(ad.nla_tracks): ad.nla_tracks.remove(t)
ad.action = None
for pb in rig.pose.bones: pb.matrix_basis.identity()
rig.data.pose_position = 'REST'; scn.frame_set(1); bpy.context.view_layer.update()

# ---- natural ground speed of each locomotion clip (from the planted foot sliding under the in-place body)
def clip_speed(name):
    a = bpy.data.actions[name]; ad.action = a
    if a.slots: ad.action_slot = a.slots[0]
    rig.data.pose_position = 'POSE'; f0, f1 = int(a.frame_range[0]), int(a.frame_range[1]); fps = scn.render.fps / scn.render.fps_base
    P = {s: [] for s in ('Left', 'Right')}
    for fr in range(f0, f1 + 1):
        scn.frame_set(fr)
        for s in P: P[s].append(rig.matrix_world @ rig.pose.bones['mixamorig:%sToeBase' % s].head)
    v = []
    for i in range(len(P['Left']) - 1):
        s = 'Left' if P['Left'][i].z < P['Right'][i].z else 'Right'
        d = P[s][i + 1] - P[s][i]; v.append((d.x * fps, d.y * fps))
    v = np.array(v); sp = np.linalg.norm(v, axis=1); m = np.median(sp); dirv = np.median(v, axis=0)
    ad.action = None; rig.data.pose_position = 'REST'
    return {'speed': round(float(m), 3), 'dir': [round(float(x), 3) for x in dirv], 'frames': f1 - f0 + 1, 'fps': fps}
info = {c: clip_speed(c) for c in CLIPS}
for pb in rig.pose.bones: pb.matrix_basis.identity()
scn.frame_set(1); bpy.context.view_layer.update()

def coll_vis(o):
    return all(not c.hide_render for c in o.users_collection)
src = [o for o in scn.objects if o.type == 'MESH' and not o.hide_render and coll_vis(o) and not o.name.startswith('_')]
for o in src:
    for m in o.modifiers:
        if m.type == 'ARMATURE': m.show_viewport = False; m.show_render = False
bpy.context.view_layer.update(); dg = bpy.context.evaluated_depsgraph_get()
parts = []
for o in src:
    me = bpy.data.meshes.new_from_object(o.evaluated_get(dg), preserve_all_data_layers=True, depsgraph=dg)
    if not me.polygons: continue
    me.transform(o.matrix_world)
    if o.name == 'TripoBase_Body':
        bm = bmesh.new(); bm.from_mesh(me)
        bmesh.ops.delete(bm, geom=[f for f in bm.faces if min(v.co.z for v in f.verts) > 1.53], context='FACES'); bm.to_mesh(me); bm.free()
    if len(me.uv_layers) == 0: me.uv_layers.new(name='Src')
    else:
        keep = me.uv_layers.active_render or me.uv_layers[0]
        for l in list(me.uv_layers):
            if l != keep: me.uv_layers.remove(l)
        me.uv_layers[0].name = 'Src'
    me.uv_layers.new(name='Atlas')
    ob = bpy.data.objects.new('SK_' + o.name, me); scn.collection.objects.link(ob)
    for vg in o.vertex_groups: ob.vertex_groups.new(name=vg.name)
    parts.append(ob)
BF = float(os.environ.get('BUDF', '1')); BUD = [(k, int(b * BF)) for k, b in [('TripoBase_Body', 2600), ('Suit', 5200), ('Sentinel_Hood', 1400), ('Sentinel_', 4200), ('Boot', 1800), ('', 4400)]]
def grp(n):
    n = n[3:]
    for k, b in BUD:
        if n.startswith(k): return k
ntri = lambda ob: sum(len(p.vertices) - 2 for p in ob.data.polygons)
tot = {}
for ob in parts: tot[grp(ob.name)] = tot.get(grp(ob.name), 0) + ntri(ob)
for ob in parts:
    r = min(1.0, dict(BUD)[grp(ob.name)] / max(1, tot[grp(ob.name)]))
    if r < 0.98:
        m = ob.modifiers.new('dec', 'DECIMATE'); m.ratio = r; m.use_collapse_triangulate = True
        with bpy.context.temp_override(object=ob, active_object=ob): bpy.ops.object.modifier_apply(modifier='dec')
for o in list(scn.objects):
    if o not in parts and o != rig: o.hide_render = True; o.hide_set(True)
bpy.ops.object.select_all(action='DESELECT')
for ob in parts: ob.select_set(True)
bpy.context.view_layer.objects.active = parts[0]
bpy.ops.object.join(); J = bpy.context.view_layer.objects.active; J.name = 'Shadow'
# only deforming bones may weigh in; at most 4 per vertex
deform = {b.name for b in rig.data.bones if b.use_deform}
for vg in list(J.vertex_groups):
    if vg.name not in deform: J.vertex_groups.remove(vg)
bpy.ops.object.mode_set(mode='WEIGHT_PAINT') if False else None
with bpy.context.temp_override(object=J, active_object=J, selected_editable_objects=[J]):
    bpy.ops.object.vertex_group_limit_total(group_select_mode='ALL', limit=4)
    bpy.ops.object.vertex_group_normalize_all(group_select_mode='ALL', lock_active=False)
unweighted = sum(1 for v in J.data.vertices if not v.groups)
me = J.data; me.uv_layers['Src'].active_render = True; me.uv_layers.active = me.uv_layers['Atlas']
bpy.ops.object.select_all(action='DESELECT'); J.select_set(True); bpy.context.view_layer.objects.active = J
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.uv.smart_project(angle_limit=1.15, island_margin=0.004, area_weight=0.0, correct_aspect=True, scale_to_bounds=False)
bpy.ops.object.mode_set(mode='OBJECT')
S = 2048
col = bpy.data.images.new('SK_col', S, S, alpha=False); emi = bpy.data.images.new('SK_emi', S, S, alpha=False, float_buffer=True)
for m in me.materials:
    if m is None: continue
    nt = m.node_tree
    for n in nt.nodes: n.select = False
    uv = nt.nodes.new('ShaderNodeUVMap'); uv.uv_map = 'Atlas'
    tn = nt.nodes.new('ShaderNodeTexImage'); tn.name = '_bake'; tn.select = True; nt.nodes.active = tn; nt.links.new(uv.outputs[0], tn.inputs[0])
    for n in list(nt.nodes):
        if n.type == 'TEX_IMAGE' and n is not tn and not n.inputs[0].is_linked:
            u = nt.nodes.new('ShaderNodeUVMap'); u.uv_map = 'Src'; nt.links.new(u.outputs[0], n.inputs[0])
scn.render.engine = 'CYCLES'; scn.cycles.samples = 4; scn.cycles.device = 'CPU'
bk = scn.render.bake; bk.margin = 6; bk.use_clear = True; bk.target = 'IMAGE_TEXTURES'
def bake_into(img, typ, **kw):
    for m in me.materials:
        if m: m.node_tree.nodes['_bake'].image = img
    bpy.ops.object.bake(type=typ, **kw)
bake_into(col, 'DIFFUSE', pass_filter={'COLOR'}); bake_into(emi, 'EMIT')
c = np.array(col.pixels[:]).reshape(S, S, 4); e = np.array(emi.pixels[:]).reshape(S, S, 4)
mx = np.maximum(e[..., :3].max(axis=2, keepdims=True), 1.0); glow = (e[..., :3].sum(axis=2) > 0.3)
out = np.clip(c[..., :3] + e[..., :3] / mx, 0, 1)
fin = bpy.data.images.new('Shadow_atlas', S, S, alpha=False); px = np.ones((S, S, 4), np.float32); px[..., :3] = out; fin.pixels[:] = px.ravel()
fin.filepath_raw = os.path.join(OUT, 'shadow_atlas.png'); fin.file_format = 'PNG'; fin.save()
em = bpy.data.images.new('Shadow_emis', S, S, alpha=False); pe = np.zeros((S, S, 4), np.float32); pe[..., 3] = 1; pe[glow] = (1.0, 0.12, 0.07, 1.0)
em.pixels[:] = pe.ravel(); em.filepath_raw = os.path.join(OUT, 'shadow_emis.png'); em.file_format = 'PNG'; em.save()
M = bpy.data.materials.new('char'); nt = M.node_tree; bs = nt.nodes['Principled BSDF']
tx = nt.nodes.new('ShaderNodeTexImage'); tx.image = fin; nt.links.new(tx.outputs[0], bs.inputs['Base Color'])
te = nt.nodes.new('ShaderNodeTexImage'); te.image = em; nt.links.new(te.outputs[0], bs.inputs['Emission Color']); bs.inputs['Emission Strength'].default_value = 1.0
bs.inputs['Metallic'].default_value = 0.05; bs.inputs['Roughness'].default_value = 0.72
me.materials.clear(); me.materials.append(M)
for p in me.polygons: p.material_index = 0
me.uv_layers.remove(me.uv_layers['Src']); me.uv_layers['Atlas'].active_render = True
# skin to the rig
J.parent = rig; J.matrix_parent_inverse = rig.matrix_world.inverted()
am = J.modifiers.new('Armature', 'ARMATURE'); am.object = rig
# keep only the chosen clips
for a in list(bpy.data.actions):
    if a.name not in CLIPS: bpy.data.actions.remove(a)
for a in bpy.data.actions: a.use_fake_user = True
ad.action = bpy.data.actions[CLIPS[0]]; ad.action_slot = ad.action.slots[0]
rig.data.pose_position = 'POSE'
for k in ('Blink',):
    pass
bpy.ops.object.select_all(action='DESELECT'); J.select_set(True); rig.select_set(True); bpy.context.view_layer.objects.active = rig
height = max((J.matrix_world @ v.co).z for v in J.data.vertices) - min((J.matrix_world @ v.co).z for v in J.data.vertices)
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'shadow_sk.glb'), use_selection=True, export_format='GLB', export_skins=True, export_def_bones=True,
    export_animations=True, export_animation_mode='ACTIONS', export_frame_step=2, export_optimize_animation_size=True, export_force_sampling=True,
    export_anim_single_armature=True, export_reset_pose_bones=True, export_morph=False, export_yup=True, export_image_format='JPEG', export_jpeg_quality=90,
    export_apply=False, export_materials='EXPORT')
info['_mesh'] = {'tris': sum(len(p.vertices) - 2 for p in me.polygons), 'verts': len(me.vertices), 'unweighted': unweighted, 'height_m': round(height, 4),
                 'bones': len(rig.data.bones), 'deform': len(deform)}
json.dump(info, open(os.path.join(OUT, 'shadow_sk.json'), 'w'), indent=1)
print('SK EXPORT DONE', json.dumps(info['_mesh']))
