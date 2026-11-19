"""Original monoline drafting alphabet. No downloaded glyphs or dependencies.

Lowercase maps to capitals; use for short display headings only. System fonts
remain responsible for body copy, controls, mathematics, and technical labels.
"""
from pathlib import Path
import math
from build_adventure_font import pack, checksum

# Authored centerlines in a 0..100 drafting square, bottom to top.
LETTERS = {
 'A': [[(0,0),(37,100),(48,100),(86,0)],[(17,38),(68,39)]],
 'B': [[(4,0),(3,100),(47,99),(70,86),(70,66),(48,51),(4,51)],[(48,51),(76,37),(76,17),(53,1),(4,0)]],
 'C': [[(80,86),(62,100),(24,98),(4,76),(2,25),(22,2),(60,0),(81,17)]],
 'D': [[(3,0),(3,100),(43,100),(73,77),(78,29),(53,2),(3,0)]],
 'E': [[(76,98),(3,100),(3,0),(79,1)],[(3,51),(64,52)]],
 'F': [[(3,0),(3,100),(79,99)],[(4,53),(62,54)]],
 'G': [[(79,85),(59,99),(26,99),(5,77),(3,24),(26,1),(65,2),(81,22),(80,49),(49,49)]],
 'H': [[(3,100),(3,0)],[(80,100),(79,0)],[(4,50),(79,52)]],
 'I': [[(6,99),(63,100)],[(34,100),(35,1)],[(5,0),(65,1)]],
 'J': [[(5,98),(76,100)],[(60,98),(59,24),(45,2),(18,0),(2,19)]],
 'K': [[(4,100),(3,0)],[(77,100),(4,44),(79,0)]],
 'L': [[(3,100),(3,0),(78,1)]],
 'M': [[(1,0),(4,100),(15,100),(51,31),(86,99),(96,99),(99,0)]],
 'N': [[(3,0),(3,100),(12,100),(76,0),(83,0),(82,100)]],
 'O': [[(24,0),(4,23),(3,75),(24,99),(59,100),(81,78),(83,25),(63,1),(24,0)]],
 'P': [[(4,0),(3,100),(49,99),(74,83),(73,61),(52,45),(4,46)]],
 'Q': [[(24,0),(4,23),(3,75),(24,99),(59,100),(81,78),(83,25),(63,1),(24,0)],[(50,29),(87,-9)]],
 'R': [[(4,0),(3,100),(49,99),(74,83),(73,61),(52,45),(4,46)],[(43,45),(81,0)]],
 'S': [[(78,87),(60,99),(25,99),(5,81),(7,63),(28,51),(57,45),(78,29),(76,13),(59,1),(23,0),(4,14)]],
 'T': [[(0,99),(86,100)],[(43,99),(44,0)]],
 'U': [[(3,100),(4,24),(23,1),(58,0),(79,25),(81,100)]],
 'V': [[(0,100),(35,0),(46,0),(85,100)]],
 'W': [[(0,100),(19,0),(29,0),(50,65),(72,0),(82,0),(102,100)]],
 'X': [[(1,100),(82,0)],[(81,100),(0,0)]],
 'Y': [[(0,100),(41,51),(83,100)],[(41,51),(40,0)]],
 'Z': [[(0,99),(81,100),(1,0),(83,1)]],
 '.': [[(13,0),(14,2)]], ',': [[(16,4),(9,-15)]],
 "'": [[(14,100),(10,81)]], '-': [[(0,48),(55,49)]],
 '!': [[(15,100),(14,29)],[(14,0),(15,2)]],
 '?': [[(0,83),(17,99),(47,100),(64,81),(61,65),(34,48),(33,28)],[(33,0),(34,2)]],
 '&': [[(79,0),(14,72),(14,90),(28,100),(47,94),(52,79),(6,29),(7,11),(26,0),(48,3),(76,45)]],
}

def glyph(ch):
    contours = []
    strokes = LETTERS.get(ch, [])
    radius = 15
    def xy(p):
        x,y=p
        return (45+x*5+y*.12, 35+y*6.7)
    for stroke in strokes:
        pts = [xy(p) for p in stroke]
        for a,b in zip(pts,pts[1:]):
            dx,dy=b[0]-a[0],b[1]-a[1]
            length=math.hypot(dx,dy)
            nx,ny=-dy/length*radius,dx/length*radius
            contours.append([(a[0]+nx,a[1]+ny),(b[0]+nx,b[1]+ny),(b[0]-nx,b[1]-ny),(a[0]-nx,a[1]-ny)])
        for x,y in pts:
            contours.append([(x+radius*math.cos(-i*math.tau/8),y+radius*math.sin(-i*math.tau/8)) for i in range(8)])
    if not contours:
        return b'',300
    points=[(round(x),round(y)) for c in contours for x,y in c]
    data=pack('hhhhh',len(contours),min(x for x,y in points),min(y for x,y in points),max(x for x,y in points),max(y for x,y in points))
    n=0
    for c in contours:
        n+=len(c)
        data+=pack('H',n-1)
    data+=pack('H',0)+bytes([1]*len(points))
    for axis in (0,1):
        previous=0
        for point in points:
            data+=pack('h',point[axis]-previous)
            previous=point[axis]
    return data, max(250,max(x for x,y in points)+65)

def build():
    chars=[' ',*LETTERS]
    glyf=b'';locations=[0];metrics=[]
    for ch in ['?',*chars]:
        data,width=glyph(ch)
        glyf+=data+b'\0'*(-len(data)%4)
        locations.append(len(glyf));metrics.append((width,0))
    mapping={ord(ch):i+1 for i,ch in enumerate(chars)}
    mapping.update({ord(ch.lower()):mapping[ord(ch)] for ch in LETTERS if ch.isalpha()})
    for apostrophe in ('’','‘'):
        mapping[ord(apostrophe)]=mapping[ord("'")]
    codes=sorted(mapping);ends=codes+[65535];n=len(ends);power=2**(n.bit_length()-1)
    cmap=pack('HHHHHHH',4,16+8*n,0,2*n,2*power,power.bit_length()-1,2*n-2*power)
    cmap+=b''.join(pack('H',c) for c in ends)+pack('H',0)
    cmap+=b''.join(pack('H',c) for c in ends)
    cmap+=b''.join(pack('H',(mapping[c]-c)&65535) for c in codes)+pack('H',1)+b'\0\0'*n
    names=['Notebook Draft','Regular','NotebookDraft-Regular-1','Notebook Draft Regular','Version 1.0','NotebookDraft-Regular']
    strings=b'';records=b''
    for name_id,name in zip([1,2,3,4,5,6],names):
        encoded=name.encode('utf-16-be')
        records+=pack('HHHHHH',3,1,0x409,name_id,len(encoded),len(strings));strings+=encoded
    count=len(metrics)
    tables={
      'cmap':pack('HHHHI',0,1,3,1,12)+cmap,'glyf':glyf,
      'loca':b''.join(pack('I',v) for v in locations),
      'hmtx':b''.join(pack('Hh',*v) for v in metrics),
      'head':pack('IIIIHHQQhhhhHHhhh',0x10000,0x10000,0,0x5f0f3cf5,3,1000,0,0,0,-70,660,725,0,8,2,1,0),
      'hhea':pack('IhhhHhhhhhhhhhhhH',0x10000,800,-200,100,700,0,0,700,1,0,0,0,0,0,0,0,count),
      'maxp':pack('IH'+'H'*13,0x10000,count,1500,250,0,0,2,0,0,0,0,0,0,0,0),
      'name':pack('HHH',0,6,78)+records+strings,
      'post':pack('IihhIIIII',0x30000,0,-100,30,0,0,0,0,0),
    }
    tables['OS/2']=pack('HhHHH'+'h'*11,0,500,400,5,0,*([0]*11))+bytes(10)+pack('IIII',1,0,0,0)+b'ABHI'+pack('HHHhhhHH',64,32,0x2019,800,-200,100,800,200)
    tags=sorted(tables);size=len(tags);power=2**(size.bit_length()-1)
    header=pack('IHHHH',0x10000,size,power*16,power.bit_length()-1,size*16-power*16)
    offset=12+size*16;records=b'';payload=b'';head_offset=0
    for tag in tags:
        data=tables[tag]
        if tag=='head':head_offset=offset
        records+=tag.encode()+pack('III',checksum(data),offset,len(data))
        padded=data+b'\0'*(-len(data)%4);payload+=padded;offset+=len(padded)
    font=bytearray(header+records+payload)
    font[head_offset+8:head_offset+12]=pack('I',(0xb1b0afba-checksum(bytes(font)))&0xffffffff)
    target=Path(__file__).resolve().parent.parent/'assets'/'notebook-draft.ttf'
    target.write_bytes(font)
    print(f'Built {target.name}: {len(font)} bytes; original drafting alphabet')

if __name__=='__main__':build()
