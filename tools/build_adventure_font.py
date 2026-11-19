"""Build the portfolio's original 5x7 display alphabet, without dependencies.

Each marked cell is an independent square contour. Lowercase deliberately maps
to the corresponding capital. The alphabet and generated font are original
project artwork, distributable with this repository.
"""
from pathlib import Path
import struct

PATTERNS = {
    'A':'01110/10001/10001/11111/10001/10001/10001',
    'B':'11110/10001/10001/11110/10001/10001/11110',
    'C':'01111/10000/10000/10000/10000/10000/01111',
    'D':'11110/10001/10001/10001/10001/10001/11110',
    'E':'11111/10000/10000/11110/10000/10000/11111',
    'F':'11111/10000/10000/11110/10000/10000/10000',
    'G':'01111/10000/10000/10111/10001/10001/01110',
    'H':'10001/10001/10001/11111/10001/10001/10001',
    'I':'111/010/010/010/010/010/111',
    'J':'00111/00010/00010/00010/10010/10010/01100',
    'K':'10001/10010/10100/11000/10100/10010/10001',
    'L':'10000/10000/10000/10000/10000/10000/11111',
    'M':'10001/11011/10101/10101/10001/10001/10001',
    'N':'10001/11001/11001/10101/10011/10011/10001',
    'O':'01110/10001/10001/10001/10001/10001/01110',
    'P':'11110/10001/10001/11110/10000/10000/10000',
    'Q':'01110/10001/10001/10001/10101/10010/01101',
    'R':'11110/10001/10001/11110/10100/10010/10001',
    'S':'01111/10000/10000/01110/00001/00001/11110',
    'T':'11111/00100/00100/00100/00100/00100/00100',
    'U':'10001/10001/10001/10001/10001/10001/01110',
    'V':'10001/10001/10001/10001/10001/01010/00100',
    'W':'10001/10001/10001/10101/10101/11011/10001',
    'X':'10001/10001/01010/00100/01010/10001/10001',
    'Y':'10001/10001/01010/00100/00100/00100/00100',
    'Z':'11111/00001/00010/00100/01000/10000/11111',
    '0':'01110/10001/10011/10101/11001/10001/01110',
    '1':'010/110/010/010/010/010/111',
    '2':'01110/10001/00001/00010/00100/01000/11111',
    '3':'11110/00001/00001/01110/00001/00001/11110',
    '4':'00010/00110/01010/10010/11111/00010/00010',
    '5':'11111/10000/10000/11110/00001/00001/11110',
    '6':'01110/10000/10000/11110/10001/10001/01110',
    '7':'11111/00001/00010/00100/01000/01000/01000',
    '8':'01110/10001/10001/01110/10001/10001/01110',
    '9':'01110/10001/10001/01111/00001/00001/01110',
    '.':'0/0/0/0/0/1/1', ',':'00/00/00/00/00/01/10',
    ':':'0/1/1/0/1/1/0', ';':'00/01/01/00/01/01/10',
    '-':'000/000/000/111/000/000/000',
    '/':'00001/00001/00010/00100/01000/10000/10000',
    '!':'1/1/1/1/1/0/1', '?':'1110/0001/0001/0010/0100/0000/0100',
    '+':'000/010/010/111/010/010/000',
    '=':'000/000/111/000/111/000/000',
    '(':'01/10/10/10/10/10/01', ')':'10/01/01/01/01/01/10',
    "'":'1/1/0/0/0/0/0', '"':'101/101/000/000/000/000/000',
    '&':'01100/10010/10100/01000/10101/10010/01101',
    '>':'1000/0100/0010/0001/0010/0100/1000',
    '<':'0001/0010/0100/1000/0100/0010/0001',
    '%':'11001/11010/00010/00100/01000/01011/10011',
    '_':'000/000/000/000/000/000/111',
}

def pack(fmt, *values):
    return struct.pack('>' + fmt, *values)

def checksum(data):
    data += b'\0' * (-len(data) % 4)
    return sum(struct.unpack('>' + 'I' * (len(data)//4), data)) & 0xffffffff

def glyph(pattern):
    rows = pattern.split('/')
    points = []
    for row, cells in enumerate(rows):
        for col, cell in enumerate(cells):
            if cell == '1':
                x, y = col * 100, (6-row) * 100
                points.extend([(x,y),(x,y+100),(x+100,y+100),(x+100,y)])
    if not points:
        return b'', 350
    contours = len(points)//4
    data = pack('hhhhh', contours, 0, 0, max(x for x,y in points), 700)
    data += b''.join(pack('H', n*4+3) for n in range(contours)) + pack('H',0)
    data += bytes([1] * len(points))
    for axis in [0,1]:
        previous = 0
        for point in points:
            data += pack('h', point[axis]-previous)
            previous = point[axis]
    return data, (len(rows[0])+1)*100

def build():
    chars = [' ', *PATTERNS]
    glyf = b''
    locations = [0]
    metrics = []
    # .notdef is a visible question mark.
    for ch in ['?', *chars]:
        outline, width = glyph(PATTERNS.get(ch,'0/0/0/0/0/0/0'))
        outline += b'\0' * (-len(outline) % 4)
        glyf += outline
        locations.append(len(glyf))
        metrics.append((width,0))
    count = len(metrics)
    mapping = {ord(ch): i+1 for i,ch in enumerate(chars)}
    mapping.update({ord(ch.lower()): mapping[ord(ch)] for ch in PATTERNS if ch.isalpha()})
    # Format 4 cmap, one segment per code point plus the required sentinel.
    codes = sorted(mapping)
    ends = codes + [65535]
    n = len(ends)
    power = 2**(n.bit_length()-1)
    cmap = pack('HHHHHHH',4,16+8*n,0,2*n,2*power,power.bit_length()-1,2*n-2*power)
    cmap += b''.join(pack('H',c) for c in ends) + pack('H',0)
    cmap += b''.join(pack('H',c) for c in ends)
    cmap += b''.join(pack('H',(mapping[c]-c)&65535) for c in codes) + pack('H',1)
    cmap += b'\0\0'*n
    names = ['Abhishek Adventure','Regular','AbhishekAdventure-Regular-1','Abhishek Adventure Regular','Version 1.0','AbhishekAdventure-Regular']
    name_ids = [1,2,3,4,5,6]
    strings = b''
    records = b''
    for name_id, name in zip(name_ids,names):
        encoded = name.encode('utf-16-be')
        records += pack('HHHHHH',3,1,0x409,name_id,len(encoded),len(strings))
        strings += encoded
    tables = {
        'cmap':pack('HHHHI',0,1,3,1,12)+cmap,
        'glyf':glyf,
        'loca':b''.join(pack('I',v) for v in locations),
        'hmtx':b''.join(pack('Hh',*v) for v in metrics),
        'head':pack('IIIIHHQQhhhhHHhhh',0x10000,0x10000,0,0x5f0f3cf5,3,1000,0,0,0,0,500,700,0,8,2,1,0),
        'hhea':pack('IhhhHhhhhhhhhhhhH',0x10000,800,-200,100,600,0,0,600,1,0,0,0,0,0,0,0,count),
        'maxp':pack('IH'+'H'*13,0x10000,count,140,35,0,0,2,0,0,0,0,0,0,0,0),
        'name':pack('HHH',0,6,78)+records+strings,
        'post':pack('IihhIIIII',0x30000,0,-100,50,0,0,0,0,0),
    }
    # OS/2 version 0, intentionally unrestricted embedding (fsType=0).
    tables['OS/2'] = pack('HhHHH'+'h'*11,0,550,400,5,0,*([0]*11)) + bytes(10) + pack('IIII',1,0,0,0) + b'ABHI' + pack('HHHhhhHH',64,32,122,800,-200,100,800,200)
    tags = sorted(tables)
    size = len(tags)
    power = 2**(size.bit_length()-1)
    header = pack('IHHHH',0x10000,size,power*16,power.bit_length()-1,size*16-power*16)
    offset = 12+size*16
    records, payload = b'', b''
    head_offset = 0
    for tag in tags:
        data = tables[tag]
        if tag == 'head': head_offset = offset
        records += tag.encode()+pack('III',checksum(data),offset,len(data))
        padded = data+b'\0'*(-len(data)%4)
        payload += padded
        offset += len(padded)
    font = bytearray(header+records+payload)
    adjustment = (0xb1b0afba-checksum(bytes(font))) & 0xffffffff
    font[head_offset+8:head_offset+12] = pack('I',adjustment)
    target = Path(__file__).resolve().parent.parent/'assets'/'adventure-pixel.ttf'
    target.write_bytes(font)
    print(f'Built {target.name}: {len(font)} bytes, {count} original glyphs')

if __name__ == '__main__':
    build()
