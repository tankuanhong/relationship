// 分支前缀
import {
    selector2id
} from './method';
// 合并写法
var prefixMap = {
    '{G2C}':{
        '[f|m],[f|m],[f|m],[f,xs|m,xb|m,xs],[s|d],[s|d]':['重表'], // 曾祖辈的表兄弟姐妹的子女
        '[f|m],[f|m],[f,xs|m,xb|m,xs],[s|d]':['重表'], // 祖辈的表兄弟姐妹的子女
    },
};
// 分解写法
var prefix = {
    '{G2}':{
        'f,f,xb':['从祖'],
        'm,f,xb':['外从祖'],
    },
    '{G1}':{
        'f,xb':['堂','同堂','亲堂','从父','叔伯','从'],
        'f,xs':['姑表','姑家'],
        'm,xb':['舅表','舅家'],
        'm,xs':['姨','从母','姨家','两姨','姨表','从'],
        'f,f,xb,s':['从堂','再从父','远堂','堂叔伯','叔伯叔伯','再从'],
        'f,f,xb,d':['堂姑表','从父姑表'],
        'f,f,xs,s':['姑表叔表'],
        'f,f,xs,d':['姑表姑表'],
        'f,m,xb,s':['舅表叔表'],
        'f,m,xb,d':['舅表姑表'],
        'f,m,xs,s':['从母叔表'],
        'f,m,xs,d':['从母姑表'],
        'm,f,xb,s':['堂舅表','从父舅表'],
        'm,f,xb,d':['堂姨表','从父姨表'],
        'm,f,xs,s':['姑表舅表'],
        'm,f,xs,d':['姑表姨表'],
        'm,m,xb,s':['舅表舅表'],
        'm,m,xb,d':['舅表姨表'],
        'm,m,xs,s':['从母舅表'],
        'm,m,xs,d':['再从母','姨姨','再从'],
        'f,f,f,xb,s,s':['三从父','再从堂','远堂','族','三从'],
        'm,m,m,xs,d,d':['三从母','三从'],
        'f,f,f,f,xb,s,s,s':['四从父','三从堂','远堂','族','四从'],
        'm,m,m,m,xs,d,d,d':['四从母','四从'],
    },
    '{G1M}':{
        'f,ob':['伯'],
        'f,lb':['叔','仲','季'],
        'm,xb':['舅'],
        'f,f,xb,s':['堂','从父','叔伯','从'],
        'f,f,xb,s&o':['堂伯','从父伯','叔伯伯','从伯'],
        'f,f,xb,s&l':['堂叔','从父叔','叔伯叔','从叔'],
        'f,f,f,xb,s,s':['从堂'],
        'f,f,f,xb,s,s&o':['从堂伯'],
        'f,f,f,xb,s,s&l':['从堂叔'],
        'f,f,f,f,xb,s,s,s':['族'],
        'f,f,xs,s&o':['姑表伯'],
        'f,f,xs,s&l':['姑表叔'],
        'f,m,xb,s&o':['舅表伯'],
        'f,m,xb,s&l':['舅表叔'],
        'f,m,xs,s&o':['姨伯','从母伯','从伯'],
        'f,m,xs,s&l':['姨叔','从母叔','从叔'],
        'm,f,xb,s':['堂舅','从父舅'],
        'm,f,xs,s':['姑表舅'],
        'm,m,xb,s':['舅表舅'],
        'm,m,xs,s':['姨舅','从母舅'],
    },
    '{G1W}':{
        'f,xs':['姑'],
        'm,xs':['姨','姏','茙','荻'],
        'f,f,xb,d':['堂姑','从父姑'],
        'f,f,f,xb,s,d':['从堂姑'],
        'f,f,xs,d':['姑表姑'],
        'f,m,xb,d':['舅表姑'],
        'f,m,xs,d':['姨姑','从母姑'],
        'm,f,xb,d':['堂姨','从父姨'],
        'm,f,xs,d':['姑表姨'],
        'm,m,xb,d':['舅表姨'],
        'm,m,xs,d':['姨姨','从母姨'],
    },
    '{G0}':{
        'xb':['侄'],
        '1,xb':['从'],
        '1,f,xb,s':['再从'],
        '1,f,f,xb,s,s':['三从'],
        'h,xb':['叔侄','叔伯'],
        'w,xb':['舅侄'],
        'xs':['甥','外甥'],
        '0,xs':['从'],
        '0,m,xs,d':['再从'],
        '0,m,m,xs,d,d':['三从'],
        'h,xs':['姑甥'],
        'w,xs':['姨甥','襟侄'],
    },
    '{M2W}':{
        'f,f,xb,w':['叔祖眷'],
        'm,f,xb,w':['叔外祖眷'],
        'f,m,xb,w':['舅祖眷'],
        'm,m,xb,w':['舅外祖眷'],
    },
    '{M2M}':{
        'f,f,xs,h':['姑祖姻'],
        'm,f,xs,h':['姑外祖姻'],
        'f,m,xs,h':['姨祖姻'],
        'm,m,xs,h':['姨外祖姻'],
    },
    '{M1W}':{
        'f,xb,w':['叔眷'],
        'f,f,xb,s,w':['从父叔眷'],
        'f,f,xs,s,w':['姑表叔眷'],
        'f,m,xb,s,w':['舅表叔眷'],
        'f,m,xs,s,w':['姨表叔眷'],
        'm,xb,w':['舅眷'],
        'm,f,xb,s,w':['从父舅眷'],
        'm,f,xs,s,w':['姑表舅眷'],
        'm,m,xb,s,w':['舅表舅眷'],
        'm,m,xs,s,w':['姨表舅眷'],
    },
    '{M1M}':{
        'f,xs,h':['姑姻'],
        'f,f,xb,d,h':['从父姑姻'],
        'f,f,xs,d,h':['姑表姑姻'],
        'f,m,xb,d,h':['舅表姑姻'],
        'f,m,xs,d,h':['姨表姑姻'],
        'm,xs,h':['姨姻'],
        'm,f,xb,d,h':['从父姨姻'],
        'm,f,xs,d,h':['姑表姨姻'],
        'm,m,xb,d,h':['舅表姨姻'],
        'm,m,xs,d,h':['姨表姨姻'],
    },
    '{M0}':{
        'xb,w':['兄弟眷'],
        'xs,h':['姊妹姻'],
        'w,xb,w':['舅兄弟眷','内兄弟眷'],
        'w,xs,h':['姨姊妹姻','内姊妹姻'],
        'h,xb,w':['叔兄弟眷','外兄弟眷'],
        'h,xs,h':['姑姊妹姻','外姊妹姻'],
        'f,xb,s,w':['从父兄弟眷'],
        'f,xb,d,h':['从父姊妹姻'],
        'f,xs,s,w':['姑表兄弟眷'],
        'f,xs,d,h':['姑表姊妹姻'],
        'm,xb,s,w':['舅表兄弟眷'],
        'm,xb,d,h':['舅表姊妹姻'],
        'm,xs,s,w':['从母兄弟眷'],
        'm,xs,d,h':['从母姊妹姻'],
    },
    '{M-1}':{
        's,w':['男眷','息眷'],
        'd,h':['女姻','息姻'],
        'xb,s,w':['侄眷'],
        'xb,d,h':['侄姻'],
        'xs,s,w':['甥眷'],
        'xs,d,h':['甥姻'],
        'h,xb,s,w':['叔侄眷'],
        'h,xb,d,h':['叔侄姻'],
        'h,xs,s,w':['姑甥眷'],
        'h,xs,d,h':['姑甥姻'],
        'w,xb,s,w':['舅侄眷'],
        'w,xb,d,h':['舅侄姻'],
        'w,xs,s,w':['姨甥眷'],
        'w,xs,d,h':['姨甥姻'],
        'f,xb,s,s,w':['堂侄眷'],
        'f,xb,s,d,h':['堂侄姻'],
        'f,xb,d,s,w':['堂甥眷'],
        'f,xb,d,d,h':['堂甥姻'],
        'f,xs,s,s,w':['姑表侄眷'],
        'f,xs,s,d,h':['姑表侄姻'],
        'f,xs,d,s,w':['姑表甥眷'],
        'f,xs,d,d,h':['姑表甥姻'],
        'm,xb,s,s,w':['舅表侄眷'],
        'm,xb,s,d,h':['舅表侄姻'],
        'm,xb,d,s,w':['舅表甥眷'],
        'm,xb,d,d,h':['舅表甥姻'],
        'm,xs,s,s,w':['姨侄眷'],
        'm,xs,s,d,h':['姨侄姻'],
        'm,xs,d,s,w':['姨甥眷'],
        'm,xs,d,d,h':['姨甥姻'],
    },
    '{M-2}':{
        's,s,w':['孙眷'],
        's,d,h':['孙姻'],
        'd,s,w':['外孙眷'],
        'd,d,h':['外孙姻'],
        'xb,s,s,w':['侄孙眷'],
        'xb,s,d,h':['侄孙姻'],
        'xb,d,s,w':['侄外孙眷'],
        'xb,d,d,h':['侄外孙姻'],
        'xs,s,s,w':['甥孙眷'],
        'xs,s,d,h':['甥孙姻'],
        'xs,d,s,w':['甥外孙眷'],
        'xs,d,d,h':['甥外孙姻'],
        'h,xb,s,s,w':['叔侄孙眷','叔伯孙眷','叔孙眷'],
        'h,xb,s,d,h':['叔侄孙姻','叔伯孙姻','叔孙姻'],
        'h,xb,d,s,w':['叔侄外孙眷','叔伯外孙眷','叔外孙眷'],
        'h,xb,d,d,h':['叔侄外孙姻','叔伯外孙姻','叔外孙姻'],
        'h,xs,s,s,w':['姑甥孙眷','姑孙眷'],
        'h,xs,s,d,h':['姑甥孙姻','姑孙姻'],
        'h,xs,d,s,w':['姑甥外孙眷','姑外孙眷'],
        'h,xs,d,d,h':['姑甥外孙姻','姑外孙姻'],
        'w,xb,s,s,w':['舅侄孙眷','舅孙眷'],
        'w,xb,s,d,h':['舅侄孙姻','舅孙姻'],
        'w,xb,d,s,w':['舅侄外孙眷','舅外孙眷'],
        'w,xb,d,d,h':['舅侄外孙姻','舅外孙姻'],
        'w,xs,s,s,w':['姨甥孙眷','姨孙眷'],
        'w,xs,s,d,h':['姨甥孙姻','姨孙姻'],
        'w,xs,d,s,w':['姨甥外孙眷','姨外孙眷'],
        'w,xs,d,d,h':['姨甥外孙姻','姨外孙姻'],
    }
};

for(var key in prefixMap){
    for(var selector in prefixMap[key]){
        var ids = selector2id(selector);
        prefix[key] = prefix[key]||{};
        ids.forEach(function(id){
            prefix[key][id] = prefixMap[key][selector];
        });
    }
}

export default prefix;
