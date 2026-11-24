import re,colorsys,sys
p='/home/claude/1v1/index.html';s=open(p).read()
H=222/360;SAT=0.55
def conv(r,g,b):
    h,l,sa=colorsys.rgb_to_hls(r/255,g/255,b/255)
    if l>=0.30 or sa>0.18: return None
    nl=0.085+l*0.95
    rr,gg,bb=colorsys.hls_to_rgb(H,nl,SAT)
    return round(rr*255),round(gg*255),round(bb*255)
cnt=[0]
def fix_css(css):
    out=[];i=0
    # split declarations to skip `color:` (text colour)
    def repl_decl(m):
        prop=m.group(1).strip().lower();val=m.group(2)
        if prop in('color','caret-color','-webkit-text-fill-color','fill','stroke'):return m.group(0)
        def hx(mm):
            t=mm.group(1)
            if len(t)==3:t=''.join(c*2 for c in t)
            if len(t)!=6:return mm.group(0)
            c=conv(int(t[0:2],16),int(t[2:4],16),int(t[4:6],16))
            if not c:return mm.group(0)
            cnt[0]+=1;return '#%02x%02x%02x'%c
        val=re.sub(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b',hx,val)
        def rg(mm):
            r,g,b=int(mm.group(2)),int(mm.group(3)),int(mm.group(4))
            c=conv(r,g,b)
            if not c:return mm.group(0)
            cnt[0]+=1;return f'{mm.group(1)}({c[0]},{c[1]},{c[2]}'
        val=re.sub(r'(rgba?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)',rg,val)
        return m.group(1)+':'+val
    return re.sub(r'([-a-zA-Z]+)\s*:([^;{}]+)',repl_decl,css)
parts=re.split(r'(<style[^>]*>.*?</style>)',s,flags=re.S)
for k in range(len(parts)):
    if parts[k].startswith('<style'):parts[k]=fix_css(parts[k])
s=''.join(parts)
open(p,'w').write(s);print('converted',cnt[0])
