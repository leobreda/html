function Treeview(ul)
{
   var json;
   var breadcrumb='';
   
   let arrHtml = [];
   let arrI=0;
   var objUL = ul;
   var parent = this;

   var lastFileChecked;
   document.getElementById(objUL).onclick = function(args)
   {
   
    var obj = args.target.parentNode;
    
    if(obj.className=='tv-folder')
        obj.className='tv-open';
    else if(obj.className=='tv-open')
        obj.className='tv-folder';
    
    else if(obj.className=='tv-file')
    {
        if(lastFileChecked!=undefined)
            lastFileChecked.className='tv-file';

        lastFileChecked = args.target.parentNode;
        obj.className='tv-ok';
    } 

    if(document.getElementById(objUL+'-breadcrumb')!=undefined)
        document.getElementById(objUL+'-breadcrumb').value=parent.renderBreadcrumb(obj);
       
    }

  
    this.renderBreadcrumb = function(args)
    {
        let ret=null;
        
        if(args.parentNode.id==objUL)
            ret= args.firstChild.innerHTML;

        else
            ret = this.renderBreadcrumb(args.parentNode.parentNode) +
                '/'+args.firstChild.innerHTML

        return ret;
    }


    this.renderize = function()
    {     
        var html = '';
    
        for(let i=0;i<this.json.length;i++)
            html+=this.renderRoot(this.json[i],i);         

        document.getElementById(objUL).innerHTML=html;  
    }



    this.renderRoot = function(args,level)
    {     
        return '<li class="tv-folder"><a onclick="javascript:'+(args.onclick!=undefined ? args.onclick.replace(/"/g,'\'')+';' : '')+objUL+'.openFolder(\''+level+'\');">'+args.label+'</a>'
            +'<ul id="'+objUL+'_ul_'+level+'"></ul></li>';
    }

    this.openFolder = function(level)
    { 
        var root = level.split('_');
        let target = 'this.json['+root[0]+']';
        

        for(let i=1;i<root.length;i++)
           target+='.tree['+root[i]+']';       

        this.renderFolder(level,eval(target));     
    }

    this.renderFolder = function(level,args)
    {
        let html='';
        document.getElementById(objUL+'_ul_'+level).innerHTML='carregando...';
        
        if(typeof args.tree=="string")       
            args.tree = eval(args.tree);
    
        if(args.tree==undefined)
            html+= ('<li class="tv-file"><a'+(args.onclick!=undefined ? ' onclick="javascript:'+args.onclick.replace(/"/g,'\'')+'"' : '')+(args.class!=undefined ? ' class="'+args.class+'"': '')+(args.style!=undefined ? ' style="'+args.style+'"': '')+'>'+args.label+'</a>');  
       
        else
        {
           for(let i=0;i<args.tree.length;i++)
           {
                if(args.tree[i].tree==undefined)
                    html+= ('<li class="tv-file"><a'+(args.tree[i].onclick!=undefined ? ' onclick="javascript:'+args.tree[i].onclick.replace(/"/g,'\'')+'"' : '')+(args.tree[i].class!=undefined ? ' class="'+args.tree[i].class+'"': '')+(args.tree[i].style!=undefined ? ' style="'+args.tree[i].style+'"': '')+'>'+args.tree[i].label+'</a>');  

                else
                    html+= '<li class="tv-folder"><a onclick="javascript:'+(args.tree[i].onclick!=undefined ? args.tree[i].onclick.replace(/"/g,'\'')+';' : '')+objUL+'.openFolder(\''+level+'_'+i+'\');">'+args.tree[i].label+'</a>'
                        + '<ul id="'+objUL+'_ul_'+level+'_'+i+'"></ul>'
                        +'</li>';            
            }
        }
        
        document.getElementById(objUL+'_ul_'+level).innerHTML=html;
    } 
}