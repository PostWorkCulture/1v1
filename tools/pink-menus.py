# Turns red into neon pink in the menu stylesheets (home menu, pause/settings, results, shop, replays).
# HUD and in-world reds (damage, Man Down, enemy score, scopes) are left alone. Safe to run again.
import re,colorsys,sys
p=sys.argv[1] if len(sys.argv)>1 else 'index.html';s=open(p).read()
MENU=re.compile(r'#menu|#duel-pause|#duel-done|#pause\b|#done\b|#d-shop|#d-replay|\.mstart|#opt-reset|\.mpop|\.dzb|\.dz\b|\.dz-|\.pz-|\.st-|\.brand|\.mcar|\.mrg')
def conv(r,g,b):
    h,l,sa=colorsys.rgb_to_hls(r/255,g/255,b/255)
    if sa<0.5 or l<0.25 or l>0.8 or not(h<0.045 or h>0.96):return None
    rr,gg,bb=colorsys.hls_to_rgb(330/360,min(.62,l*1.02),1.0)
    return round(rr*255),round(gg*255),round(bb*255)
n=[0]
def body(t):
    def hx(m):
        c=m.group(1);c6=c if len(c)==6 else ''.join(x*2 for x in c)
        v=conv(*[int(c6[i:i+2],16) for i in (0,2,4)])
        if not v:return m.group(0)
        n[0]+=1;return '#%02x%02x%02x'%v
    t=re.sub(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b',hx,t)
    def rg(m):
        v=conv(int(m.group(2)),int(m.group(3)),int(m.group(4)))
        if not v:return m.group(0)
        n[0]+=1;return f'{m.group(1)}({v[0]},{v[1]},{v[2]}'
    return re.sub(r'(rgba?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)',rg,t)
def css(c):
    return re.sub(r'([^{}]+)\{([^{}]*)\}',lambda m:m.group(1)+'{'+(body(m.group(2)) if MENU.search(m.group(1)) else m.group(2))+'}',c)
parts=re.split(r'(<style[^>]*>.*?</style>)',s,flags=re.S)
s=''.join(css(x) if x.startswith('<style') else x for x in parts)
open(p,'w').write(s);print('converted',n[0])
