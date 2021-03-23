// H5模板生成工具


String.prototype.seam=function(){
    return this.replace(/\\/g,"\\\\").replace(/(\n|\r)+/g,"\\n").replace(/("|')/g,"\\\$1").replace(/\n/g,"\"+\n\"")
}
/**
* 模板解析器
*{{variable}} {{#each array}} {{$index}} {{$length}} {{$value}} ... {{#endEach}} {{#if}} ... {{#elseIf}} ... {{#endIf}}
 * <!--#if--><!--#elseif--><!--#else--><!--#endIf--><!--#each--><!--#endeach-->辅助反编译
*/

//循环
function templ (templStr,json,setHelp){
    var eachID = 0;
        var help;
        if(!setHelp){
            help = ["","","","","","",""];
        }else{
            help = ["<!--#each-->","<!--#eachItem-->","<!--#endeach-->","<!--#if-->","<!--#elseIf-->","<!--#else-->","<!--#endIf-->"]
        }
         templStr = templStr.seam()
         //each
         .replace(/\{\{#each\s+([^}]+)\s*\}\}/g,function(m,m1){
            eachID++;
            var templId = eachID;
            var parentStr="";
            while(templId>0){
                parentStr += "if(!$parent){"
                parentStr +=" $parent= $parent"+(templId-1)+";}";
                templId--;
            }
            return "\"+(function(){var $length ="+m1+"&&"+m1+".length; var t=\"\";"+m1+"&&"+m1+".forEach(function($value,$index){ "+
            "var $ID ="+eachID+";"+
            "var $parent;"+parentStr+
            "var $parent"+eachID+"={$value:$value,$length:$length,id:"+eachID+",$index:$index,$parent:$parent};\n t+= \""
        })
        .replace(/\{\{#endEach\s*\}\}/g,help[2]+"\"});return t;}()) +\"")
        //ifelse
        .replace(/\{\{#if\s+([^}]+)\s*\}\}/g,function(m,m1){
            return "\";if("+m1.replace(/\\/g,"")+"){ t+=\""+help[3]
        }).replace(/\{\{#elseIf\s+([^}]+)\s*\}\}/gi,function(m,m1){
            return "\";}else if("+m1.replace(/\\/g,"")+"){ t+=\""+help[4]
        }).replace(/\{\{#else\s*\}\}/g,function(m,m1){
            return "\";}else{ t+=\""+help[5]
        }).replace(/\{\{#endIf\s*\}\}/gi,function(m,m1){
            return "\";} t+=\""+help[6]
        })
        //表达式/变量
        .replace(/\{\{\s*([^}]+)\s*\}\}/g,function(m,m1){
            return "\"+(("+m1.replace(/\\/g,"")+")==null?'':("+m1.replace(/\\/g,"")+"))+\""
        })
        //顶层$parent没有定义
        var defindedParentstring = "";
        while(eachID>0){
            defindedParentstring += "var $parent"+(eachID-1)+";"
            eachID--;
        }
  
        try{
            var result = "with(obj){try{"+defindedParentstring+"var t =\""+templStr.replace(/\+$/,"")+"\"; }catch(e){debugger;console.log(e.message);console.log('parse error:'.error,obj.__templatefile);} return t;}"
            var fn = new Function("obj",result);
            // result = null;
        }catch (e){
            console.log(e.message,"parse error:".error,json.__templatefile);
            return result;
        }
        return fn(json);
}

var a=templ(
  `{{#each titleList.items}}
  {{#each $value.sedList}}
  <div class="right-tag" data-name="{{$value.name}}" data-key="{{$value.key}}">
    <div class="tags">
      <div class="model">
        <div class="title">
          模板
        </div>
  
        {{#each $value.module}}
        <div class="text">
          {{$value}}
        </div>
        {{#endEach}}
  
      </div>
      <div class="eg">
        <div class="title">
          样例
        </div>
        {{#each $value.eg}}
        <div class="text">
          {{$value}}
        </div>
        {{#endEach}}
      </div>
      <div class="task">
        <div class="title">
          工具
        </div>
        {{#each $value.task}}
        <div class="text">
          {{$value}}
        </div>
        {{#endEach}}
      </div>
      <div class="speciallist">
        <div class="title">
          专家
        </div>
        {{#each $value.speciallist}}
        <div class="text">
          {{$value}}
        </div>
        {{#endEach}}
      </div>
      <div class="link">
        <div class="title">
          链接
        </div>
        {{#each $value.link}}
        <div class="text">
          {{$value}}
        </div>
        {{#endEach}}
      </div>
    </div>
  
  </div>
  {{#endEach}}
  {{#endEach}} `,{  titleList: {
    title: "数字化转型方法论 ",
    items: [
      {
      smallTitle: '现状分析',
      sedList: [{
          key: 0,
          name: '研讨数字化转型愿景目标或蓝图',
          groupId: '1007587',
          blogId: '10007491',
          module:['数字化转型愿景'],
          eg:["华为变革项目ISC+愿景"," XX客户变革项目愿景"],
          task:["XX工具"],
          speciallist:["聂永瑜 00256669","庄瀚瀚 00390568"],
          link:["研讨会指导"],
        },
        {
          key: 1,
          name: '解决方案构思',
          groupId: '1007587',
          blogId: '10009355',
          module:['22','sad','sad'],
          eg:["asd+愿景"," sdff"],
          task:["XX工具",'asffdfg'],
          speciallist:["000","212",'212'],
          link:["s"],
        },
        {
          key: 2,
          name: '价值流和业务能力',
          groupId: '',
          blogId: ''
        },
        {
          key: 3,
          name: '业务能力框架',
          groupId: '',
          blogId: ''
        },
      ]
      },
      {
        smallTitle: '蓝图规划',
        sedList: [{
            key: 4,
            name: '研讨数字化转型愿景目标或蓝图',
            groupId: '1007587',
            blogId: '10007491',
            module:['数字化转型愿景'],
            eg:["华为变革项目ISC+愿景"," XX客户变革项目愿景"],
            task:["XX工具"],
            speciallist:["聂永瑜 00256669","庄瀚瀚 00390568"],
            link:["研讨会指导"],
          },
          {
            key: 5,
            name: '解决方案构思',
            groupId: '1007587',
            blogId: '10009355'
          },
          {
            key: 6,
            name: '价值流和业务能力',
            groupId: '',
            blogId: ''
          },
          {
            key: 7,
            name: '业务能力框架',
            groupId: '',
            blogId: ''
          },
        ]
        },
        {
          smallTitle: '架构规划',
          sedList: [{
              key: 8,
              name: '研讨数字化转型愿景目标或蓝图',
              groupId: '1007587',
              blogId: '10007491',
              module:['数字化转型愿景'],
              eg:["华为变革项目ISC+愿景"," XX客户变革项目愿景"],
              task:["XX工具"],
              speciallist:["聂永瑜 00256669","庄瀚瀚 00390568"],
              link:["研讨会指导"],
            },
            {
              key: 9,
              name: '解决方案构思',
              groupId: '1007587',
              blogId: '10009355'
            },
            {
              key: 10,
              name: '价值流和业务能力',
              groupId: '',
              blogId: ''
            },
            {
              key: 11,
              name: '业务能力框架',
              groupId: '',
              blogId: ''
            },
          ]
          }
  ],
  }});

  console.log(a)
