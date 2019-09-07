function Modal(args)
{
   
    var overlay=document.createElement('div');
    overlay.setAttribute('id','modal-overlay');
    var body = document.body;
    body.appendChild(overlay);
    document.getElementById('modal-overlay').innerHTML='<div id="modal"></div>';
    
    this.text = function(message,args){
        this._setWidth(args);
        document.getElementById('modal').innerHTML='<span onclick="javascript:modal.close()"; id="modal-close">&times;</span><span id="modal_title"></span><div id="modal-content">null</div>';
        this._setTitle(args);
        document.getElementById('modal-content').innerHTML=message+this._getButton(args);
        document.getElementById('modal-overlay').style.display='block';  
    }

    this.wait = function(message,args){
        this._setWidth(args);
        document.getElementById('modal').innerHTML='<img src="ajax-loader.gif" style="float:right;"/><span id="modal_title"></span><div id="modal-content">null</div>';
        this._setTitle(args);
        document.getElementById('modal-content').innerHTML=message;
        document.getElementById('modal-overlay').style.display='block';
    };

   

    this.close = function()
    {
        document.getElementById('modal').innerHTML='';
        document.getElementById('modal-overlay').style.display='none';   
    }

    this.iframe = function(address,args)
    {
        this._setWidth(args);
        document.getElementById('modal').innerHTML='<span onclick="javascript:modal.close()"; id="modal-close">&times;</span><span id="modal_title"></span><div id="modal-content">null</div>'; 
        this._setTitle(args);
        document.getElementById('modal-content').innerHTML='<iframe src="'+address+'" id="modal_iframe"></iframe>';
        document.getElementById('modal_iframe').style.height=window.innerHeight-300+'px';
        
        document.getElementById('modal-overlay').style.display='block'; 

    }

    this.alert = function(message,args)
    {
        this._setWidth(args);
        document.getElementById('modal').innerHTML='<span onclick="javascript:modal.close()"; id="modal-close">&times;</span><span id="modal_title"></span><div id="modal-content">null</div>'; 
        this._setTitle(args);

        if(args!=undefined)
        {    
            if(args.button!=undefined)
                args.button = [{label:args.button}];
            else
                args.button = [{label:'OK'}];
        }
        else if(args==undefined)
            args = {button:[{label:'OK'}]};

        document.getElementById('modal-content').innerHTML=message+this._getButton(args);
        document.getElementById('modal-overlay').style.display='block'; 
    }


    this.confirm = function(message,args)
    {
        this._setWidth(args);
        document.getElementById('modal').innerHTML='<span onclick="javascript:modal.close()"; id="modal-close">&times;</span><span id="modal_title"></span><div id="modal-content">null</div>'; 
        this._setTitle(args);

        if(args==undefined)
        {
            alert('modal.confirm = argumento callback nao parametrizado');
            return;
        }
        
        if(args.button!=undefined)
            args.button = [{label:args.button.ok,callback:args.callback},{label:args.button.cancel}];
        else
            args.button = [{label:'OK',callback:args.callback},{label:'Cancelar'}];
        
        document.getElementById('modal-content').innerHTML=message+this._getButton(args);
        document.getElementById('modal-overlay').style.display='block'; 
    }

    this.prompt = function(message,args)
    {
        if(args==undefined)
        {
            alert('modal.prompt = argumentos nao parametrizados');
            return;
        }
       
        else if(args.callback==undefined)
        {
            alert('modal.field = argumento callback nao parametrizado');
            return;
        }

        var form = '<br /><input type="text" id="modal-prompt-input"  style="width:80%;"/>';
        args.callback = args.callback.replace('()','(document.getElementById(\'modal-prompt-input\').value)')
        this.confirm(message+form,args);
        document.getElementById('modal-prompt-input').focus();
    }

    

    this._setTitle = function(args){
        if(args!=undefined)  
            document.getElementById('modal_title').innerHTML=  (args.title!=undefined ? args.title+'<br /><br />' : '');
        else
            document.getElementById('modal_title').innerHTML ='';
    }

    this._setWidth = function(args){
        if(args!=undefined)
            document.getElementById('modal').style.width =  (args.width!=undefined ? args.width : '50%');
        else
            document.getElementById('modal').style.width ='50%';
    }

    this._getButton = function(args){
        if(args==undefined) return '';
        if(args.button==undefined) return '';
        
        var ret='<p class="modal-button">';

        for(i=0;i<args.button.length;i++)
        {
            ret+='<input type="button" \
                    value="'+args.button[i].label+'"'
                    + (args.button[i].style!=undefined ? 'style="'+args.button[i].style+'"' : '')
                    + (args.button[i].class!=undefined ? 'class="'+args.button[i].class+'"' : '')
                    + ' onclick="javascript:'+(args.button[i].callback!=undefined ? args.button[i].callback+';' : '')
                    +'modal.close();" />';

        }
        ret+="</p>"
        return ret;
    }
}
