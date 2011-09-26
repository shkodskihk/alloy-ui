AUI.add("aui-form-builder-base",function(br){var bk=br.Lang,aA=bk.isArray,aC=bk.isBoolean,bh=bk.isString,bO=bk.isObject,ac=bk.isValue,bL=br.Array,bQ=br.AvailableField.getAvailableFieldById,e=function(A){return(A instanceof br.AvailableField);},aY=function(A){return(A instanceof br.Node);},aH=function(A){return(A instanceof br.NodeList);},bP=function(A){return(A instanceof br.FormBuilder);},bg=function(A){return(A instanceof br.FormBuilderField);},a0=br.DD.DDM,d="acceptChildren",bm="active",H="add",bI="append",o="autoSelectFields",bu="availableField",bN="availableFields",X="base",ax="boundingBox",by="builder",bD="button",z="buttons",s="buttonsNode",i="children",bj="click",al="cloneNode",az="component",at="container",ar="content",bK="contentBox",aZ="data",ad="dblclick",Y="dd",bC="default",ag="defaultMessage",B="defaultMessageNode",aB="delete",j="diagram",bb=".",aM="drag",am="dragContainer",r="dragContainerNode",bn="dragNodesList",bc="draggable",n="dragging",ai="drop",aS="dropContainer",aV="dropContainerNode",bt="dropNode",aF="dropZoneNode",ao="duplicate",C="edit",bF="editing",bd="emptySelection",a6="",bs="enableEditing",aW="field",c="fields",D="fieldsNestedListConfig",aj="first",m="firstChild",aJ="fixed",P="focused",k="form",aP="formBuilder",Q="form-layout",h="helper",aa="hidden",l="icon",bA="id",bJ="inactive",bx="index",aE="input",b="items",bR="key",R="label",bp="labelNode",av="last",aI="lastChild",af="list",aK="localizationMap",aX="message",be="mouseenter",w="mouseleave",ak="name",a3="nestedList",bS="node",N="options",aL="over",ah="parent",G="parentNode",S="placeAfter",y="placeBefore",bq="placeholder",au="predefinedValue",aO="prepend",bv="readOnlyAttributes",a8="records",bz="recordset",T="region",bM="remove",t="render",ay="rendered",W="required",ba="save",aQ="selected",aD="settings",aU="settingsButtonsNode",Z="settingsFormNode",I="showLabel",J=" ",aR="srcNode",a5="state",bl="strings",aN="tabs",U="tabsContentNode",a2="tabsListNode",a="tabsNode",bE="tabview",p="target",M="templateNode",a7="text",q="tip",K="type",an="unique",f="value",E="values",aT="widget",a1="width",bi="zone",g=",",bH="-",ab=".",x="",bo="#",aG="_",v=br.getClassName,bf=bN+aG+aW+aG,bw=c+aG+aW+aG,O=v(Y,n),bG=v(j,by,ai,at),bB=v(j,by,aW,bc),V=v(k,by,ai,bi),a9=v(k,by,aW),aq=v(k,by,aW,bF),u=v(k,by,bq),a4=v(k,by,an),ap=[bA,ak],ae='<div class="'+u+'"></div>';var F=br.Component.create({NAME:bu,ATTRS:{predefinedValue:{value:x,},readOnlyAttributes:{value:[],validator:aA},unique:{value:false,validator:aC}},EXTENDS:br.AvailableField});br.FormBuilderAvailableField=F;var aw=br.Component.create({NAME:aP,ATTRS:{autoSelectFields:{value:false},enableEditing:{value:true},fieldsNestedListConfig:{setter:"_setFieldsNestedListConfig",validator:bO,value:null},strings:{value:{addNode:"Add field",cancel:"Cancel",propertyName:"Property Name",save:"Save",settings:"Settings",value:"Value"}}},EXTENDS:br.DiagramBuilderBase,FIELDS_TAB:0,SETTINGS_TAB:1,prototype:{uniqueFields:new br.DataSet(),initializer:function(){var A=this;A.on({cancel:A._onCancel,"drag:end":A._onDragEnd,"drag:start":A._onDragStart,"drag:mouseDown":A._onDragMouseDown,save:A._onSave});A.uniqueFields.after(H,br.bind(A._afterUniqueFieldsAdd,A));A.uniqueFields.after(bM,br.bind(A._afterUniqueFieldsRemove,A));A.dropContainer.delegate(bj,br.bind(A._onClickField,A),ab+a9);A.dropContainer.delegate(ad,br.bind(A._onDblClickField,A),ab+a9);},syncUI:function(){var A=this;A._setupAvailableFieldsNestedList();A._setupFieldsNestedList();},closeEditProperties:function(){var A=this;var L=A.editingField;A.tabView.selectTab(br.FormBuilder.FIELDS_TAB);if(L&&L.get(ay)){L.get(ax).removeClass(aq);}A.editingField=null;},createField:function(L){var A=this;if(!bg(L)){L=new (A.getFieldClass(L.type||aW))(L);}L.set(by,A);L.set(ah,A);return L;},duplicateField:function(bT){var A=this;var L=A._getFieldNodeIndex(bT.get(ax));var bU=A._cloneField(bT,true);A.insertField(bU,++L,bT.get(ah));},editField:function(L){var A=this;if(bg(L)){A.closeEditProperties();A.tabView.selectTab(br.FormBuilder.SETTINGS_TAB);A.propertyList.set(bz,L.getProperties());L.get(ax).addClass(aq);A.editingField=A.selectedField=L;}},getFieldClass:function(bT){var A=this;var L=br.FormBuilder.types[bT];if(L){return L;}else{br.log("The field type: ["+bT+"] couldn't be found.");return null;}},insertField:function(bU,L,bT){var A=this;bT=bT||A;bU.get(ah).removeField(bU);bT.addField(bU,L);},plotField:function(bU,L){var A=this;var bT=bU.get(ax);if(!bU.get(ay)){bU.render(L);}else{L.append(bT);}A._syncUniqueField(bU);A.fieldsNestedList.add(bT);},plotFields:function(L,bT){var A=this;bT=bT||A.dropContainer;L=L||A.get(c);bT.setContent(a6);br.each(L,function(bU){A.plotField(bU,bT);});},select:function(L){var A=this;A.unselectFields();A.selectedField=L.set(aQ,true).focus();},unselectFields:function(){var A=this;var L=A.selectedField;if(L){L.set(aQ,false);}A.selectedField=null;},_afterUniqueFieldsAdd:function(bT){var A=this;var bU=bT.attrName;if(e(bU)){var L=bU.get(bS);bU.set(bc,false);L.unselectable();}},_afterUniqueFieldsRemove:function(bT){var A=this;var bU=bT.attrName;if(e(bU)){var L=bU.get(bS);bU.set(bc,true);L.selectable();}},_cloneField:function(bU,L){var A=this;var bT={};bL.each(bU.getProperties(),function(bW){var bV=bW.attributeName;if(bL.indexOf(ap,bV)===-1){bT[bV]=bW.value;}});if(L){bT[c]=[];br.each(bU.get(c),function(bW,bV){if(!bW.get(an)){bT[c][bV]=A._cloneField(bW,L);}});}return A.createField(bT);},_dropField:function(bV){var L=this;var bX=bV.getData(bu);var bW=br.Widget.getByNode(bV);var A=bV.get(G);if(e(bX)){var bY=bX.get(bA).replace(bf,x);bW=L.createField({fixed:bX.get(aJ),id:bY,label:bX.get(R),localizationMap:bX.get(aK),options:bX.get(N),predefinedValue:bX.get(au),readOnlyAttributes:bX.get(bv),required:bX.get(W),showLabel:bX.get(I),tip:bX.get(q),type:bX.get(K),unique:bX.get(an),width:bX.get(a1)});if(bX.get(an)){bW.set(ak,bX.get(ak));}L.select(bW);}if(bg(bW)){var bU=br.Widget.getByNode(A);if(!bg(bU)){bU=L;}var bT=L._getFieldNodeIndex(bV);L.insertField(bW,bT,bU);
}},_getFieldId:function(bT){var A=this;var bU=bT.get(bA);var L;if(e(bT)){L=bf;}else{L=bw;}return bU.replace(L,x);},_getFieldNodeIndex:function(L){var A=this;return L.get(G).all("> *:not("+ab+u+")").indexOf(L);},_onClickField:function(L){var A=this;var bT=br.Widget.getByNode(L.currentTarget);A.select(bT);L.stopPropagation();},_onDblClickField:function(L){var A=this;if(!L.target.ancestor(ab+a9,true)){return;}var bT=br.Widget.getByNode(L.currentTarget);if(bT){A.editField(bT);}L.stopPropagation();},_onDragEnd:function(bT){var A=this;var L=bT.target;var bU=L.get(bS);A._dropField(bU);if(!bg(br.Widget.getByNode(bU))){bU.remove();L.set(bS,A._originalDragNode);}},_onDragMouseDown:function(L){var A=this;var bT=L.target.get(bS);var bU=br.AvailableField.getAvailableFieldByNode(bT);if(e(bU)&&!bU.get(bc)){L.halt();}},_onDragStart:function(bU){var A=this;var bT=bU.target;var bW=bT.get(bS);if(bg(br.Widget.getByNode(bW))){return;}A._originalDragNode=bW;var bV=bW.clone();bW.placeBefore(bV);bT.set(bS,bV);var L=bW.getData(bu);bV.setData(bu,L);bV.attr(bA,a6);bV.hide();bW.removeClass(O);bW.show();A.fieldsNestedList.add(bV);},_onSave:function(bT){var A=this;var L=A.editingField;if(L){var bU=A.propertyList.get(bz);bL.each(bU.get(a8),function(bV){var bW=bV.get(aZ);L.set(bW.attributeName,bW.value);});A._syncUniqueField(L);}},_setAvailableFields:function(bT){var L=this;var A=[];bL.each(bT,function(bV,bU){A.push(e(bV)?bV:new br.FormBuilderAvailableField(bV));});return A;},_setFieldsNestedListConfig:function(bT){var A=this;var L=A.dropContainer;return br.merge({bubbleTargets:A,dd:{groups:[bN],plugins:[{cfg:{horizontal:false,scrollDelay:150},fn:br.Plugin.DDWinScroll}]},dropCondition:function(bV){var bU=bV.drop.get(bS);var bW=br.Widget.getByNode(bU);if(bg(bW)){return true;}return false;},placeholder:br.Node.create(ae),dropOn:ab+V,sortCondition:function(bV){var bU=bV.drop.get(bS);return(bU!==A.dropContainer&&L.contains(bU));}},bT||{});},_setupAvailableFieldsNestedList:function(){var A=this;if(!A.availableFieldsNestedList){var L=A.fieldsContainer.all(ab+bB);A.availableFieldsNestedList=new br.NestedList(br.merge(A.get(D),{nodes:L}));}},_setupFieldsNestedList:function(){var A=this;if(!A.fieldsNestedList){A.fieldsNestedList=new br.NestedList(A.get(D));}},_syncUniqueField:function(bT){var A=this;var L=A.uniqueFields;var bU=bQ(A._getFieldId(bT));if(e(bU)){if(bU.get(an)||bT.get(an)){bT.set(bv,bU.get(bv));bT.set(an,bU.get(an));bL.each(bT.getProperties(),function(bW){var bV=bW.attributeName;if(bV===bA){return;}bU.set(bV,bW.value);});bU.set(aK,bT.get(aK));L.add(bU,bT);}}}}});br.FormBuilder=aw;br.FormBuilder.types={};},"@VERSION@",{requires:["aui-base","aui-button-item","aui-data-set","aui-diagram-builder-base","aui-nested-list","aui-tabs"],skinnable:true});AUI.add("aui-form-builder-field",function(ck){var cb=ck.Lang,a7=cb.isArray,cL=cb.isObject,b7=cb.isString,cJ=ck.Array,g="acceptChildren",aJ="availableFieldId",d="bodyContent",a5="boolean",aX="boundingBox",ct="builder",cB="button",N="buttons",z="buttonsNode",cN="cancel",aO="checkbox",O="checked",q="children",cx="clearfix",a0="close",a2="component",aS="container",cI="contentBox",cE="controls",bY="controlsToolbar",cM="dataType",cy="default",bb="delete",h="deleteEvent",bp="deleteFieldsMessage",bZ="deleteMessage",D="description",bS="disabled",b1=".",bo="drag",aI="dragContainer",y="dragContainerNode",cd="dragNodesList",aE="drop",cm="dropNode",bE="dropZone",bg="dropZoneNode",aM="duplicate",B="duplicateEvent",bB="duplicateMessage",V="edit",o="editEvent",a8="editMessage",bT="",bC="field",f="fields",bk="fixed",bX="for",s="form",br="formBuilder",aN="form-builder-field",b4="gear",u="help",p="helper",ax="hidden",t="icon",cw="id",am="label",cg="labelNode",bP="lightbulb",bt="metadata",aH="name",j="newwin",a9="no",cO="node",a="panel",aD="parent",cf="pencil",bm="portalLayout",aV="predefinedValue",bF="proxy",cs="readOnlyAttributes",a1="rendered",ar="required",bj="requiredFlagNode",bA="select",bs="selected",bd="settings",av="settingsFormNode",Z="showLabel",az="size",aa=" ",bR="state",b5="string",cc="strings",ag="templateNode",bV="text",au="textarea",w="tip",bI="tipIconNode",ab="type",aL="unique",bx="widget",cu="yes",b8="zone",n=",",cG="-",ay=".",M="",ce="#",bh="_",H=ck.getClassName,bz=H(a2),bu=H(s,ct,cB),at=H(s,ct,cB,bb),U=H(s,ct,cB,aM),aK=H(s,ct,cB,V),m=H(s,ct,cB,cE),aw=H(s,ct,aE,cO),F=H(s,ct,aE,b8),cr=H(s,ct,bC),an=H(s,ct,bC,N),ba=H(s,ct,bC,bs),b0=H(s,ct,bk),b9=H(s,ct,t),ah=H(s,ct,t,bb),bv=H(s,ct,t,aM),W=H(s,ct,t,V),bD=H(s,ct,t,w),aY=H(s,ct,ar),G=H(s,ct,aL),c=H(bC),aR=H(bC,am),bG=H(bC,bV),r=H(p,cx),ai=H(p,ax),b2=H(bR,cy),J=H(bx),ci='<div class="'+[J,bz,cr].join(aa)+'"></div>',ae='<div class="'+F+'"></div>',bi='<label class="'+aR+'" for="{id}">{label}</label>',aC='<span class="'+aY+'">*</span>',by='<a href="javascript:;" class="'+bD+'"></a>';var aj=ck.Component.create({NAME:aN,AUGMENTS:[ck.FieldSupport]});var v=ck.Component.create({NAME:aN,ATTRS:{acceptChildren:{value:true},controlsToolbar:{validator:cL,valueFn:"_valueControlsToolbar"},dataType:{value:b5},disabled:{value:false},fixed:{value:false},id:{setter:"_setId"},label:{value:bT},localizationMap:{value:{}},name:{valueFn:function(){var A=this;var L=A.get(ab);return ck.FormBuilderField.buildFieldName(L);}},parent:{value:null},predefinedValue:{value:bT},readOnlyAttributes:{value:[],validator:a7},required:{setter:ck.DataType.Boolean.parse,value:false},selected:{setter:ck.DataType.Boolean.parse,value:false},showLabel:{setter:ck.DataType.Boolean.parse,value:true},strings:{value:{button:"Button",buttonType:"Button Type",deleteFieldsMessage:"Are you sure you want to delete the selected field(s)?",duplicateMessage:"Duplicate",editMessage:"Edit",label:"Label",large:"Large",medium:"Medium",multiple:"Multiple",name:"Name",no:"No",options:"Options",predefinedValue:"Predefined Value",required:"Required",reset:"Reset",showLabel:"Show Label",small:"Small",submit:"Submit",tip:"Tip",type:"Type",width:"Width",yes:"Yes"}},tabIndex:{value:1},template:{value:bT},tip:{value:bT},type:{value:bT},unique:{setter:ck.DataType.Boolean.parse,value:false},zIndex:{value:100},dropZoneNode:{valueFn:function(){return ck.Node.create(ae);
}},labelNode:{valueFn:function(){var A=this;return ck.Node.create(cb.sub(bi,{id:A.get(cw),label:A.get(am)}));}},requiredFlagNode:{valueFn:function(){return ck.Node.create(aC);}},templateNode:{valueFn:"getNode"},tipIconNode:{valueFn:function(){return ck.Node.create(by);}}},UI_ATTRS:[g,bS,f,bk,am,aH,aV,ar,bs,Z,w,aL],EXTENDS:aj,buildFieldId:function(A){return f+bh+bC+bh+A;},buildFieldName:function(A){return A+(++ck.Env._uidx);},HTML_PARSER:{dropZoneNode:b1+F,labelNode:am+b1+aR,requiredFlagNode:b1+aY,tipIconNode:b1+bD},prototype:{BOUNDING_TEMPLATE:ci,CONTROLS_TEMPLATE:'<div class="'+m+'"></div>',initializer:function(){var A=this;A.toolTip=new ck.Tooltip({trigger:A.get(bI),hideDelay:100});},renderUI:function(){var A=this;var L=A.get(cI);var cR=A.get(cg);var cT=A.get(bj);var cS=A.get(ag);var cQ=A.get(bI);L.addClass(r);L.append(cR);L.append(cT);L.append(cQ);L.append(cS);A.toolTip.render();},destructor:function(){var A=this;A.get(f).each(function(cQ){cQ.destroy();});var L=A.get(ct);if(L.editingField===A){delete L.editingField;L.closeEditProperties();}if(L.selectedField===A){delete L.selectedField;}if(A.controlsToolbar){A.controlsToolbar.destroy();}A.get(aX).dd.destroy();A.toolTip.destroy();A.get(aD).removeField(A);L.uniqueFields.remove(A);},createField:function(cQ){var A=this;var L=A.get(ct);cQ=L.createField(cQ);cQ.set(aD,A);return cQ;},getHTML:function(){return bT;},getNode:function(){var A=this;return ck.Node.create(A.getHTML());},getProperties:function(){var A=this;var cQ=A.getPropertyModel();var L=A.get(cs);cJ.each(cQ,function(cU){var cS=cU.attributeName;var cT=A.get(cS),cR=cb.type(cT);if(cR===a5){cT=String(cT);}cU.value=cT;if(cJ.indexOf(L,cS)>-1){cU.editor=false;}});return cQ;},getPropertyModel:function(){var L=this;var A=L.getStrings();return[{attributeName:ab,editor:false,name:A[ab]},{attributeName:am,editor:new ck.TextCellEditor(),name:A[am]},{attributeName:Z,editor:new ck.RadioCellEditor({options:{"true":A[cu],"false":A[a9]}}),formatter:ck.bind(L._booleanFormatter,L),name:A[Z]},{attributeName:ar,editor:new ck.RadioCellEditor({options:{"true":A[cu],"false":A[a9]}}),formatter:ck.bind(L._booleanFormatter,L),name:A[ar]},{attributeName:aH,editor:new ck.TextCellEditor({validator:{rules:{value:{required:true}}}}),name:A[aH]},{attributeName:aV,editor:new ck.TextCellEditor(),name:A[aV]},{attributeName:w,editor:new ck.TextAreaCellEditor(),name:A[w]}];},_booleanFormatter:function(cR){var L=this;var A=L.getStrings();var cQ=ck.DataType.Boolean.parse(cR.record.get(bJ).value);return cQ?A[cu]:A[a9];},_renderControlsToolbar:function(){var L=this;var cQ=L.get(aX);if(!L.controlsNode){L.controlsNode=ck.Node.create(L.CONTROLS_TEMPLATE);L.controlsNode.appendTo(cQ);}var A=L.controlsToolbar=new ck.Toolbar(L.get(bY)).render(L.controlsNode);A.get(aX).hide();L._uiSetFixed(L.get(bk));},_setId:function(A){return ck.FormBuilderField.buildFieldId(A);},_uiSetAcceptChildren:function(cS){var A=this;var L=A.get(aX);var cR=A.get(bg);var cQ=L.one(b1+F);if(cS&&!cQ){L.append(cR);}else{if(!cS&&cQ){cQ.remove();}else{if(cS&&cQ){A.set(bg,cQ);}}}},_uiSetDisabled:function(cQ){var A=this;var L=A.get(ag);if(cQ){L.setAttribute(bS,cQ);}else{L.removeAttribute(bS);}},_handleDuplicateEvent:function(L){var A=this;if(!A.get(aL)){A.get(ct).duplicateField(A);}},_handleEditEvent:function(L){var A=this;A.get(ct).editField(A);},_handleDeleteEvent:function(cQ){var L=this;if(!L.get(ar)){var A=L.getStrings();if(confirm(A[bp])){L.destroy();}}},_uiSetFields:function(cQ){var A=this;var L=A.get(ct);L.plotFields(cQ,A.get(bg));},_uiSetFixed:function(cR){var cQ=this;var L=cQ.controlsToolbar;var A=cQ.getStrings();if(L){if(cR){L.remove(h);}else{L.add({handler:ck.bind(cQ._handleDeleteEvent,cQ),icon:a0,id:h,title:A[bZ]});}}},_uiSetLabel:function(cQ){var A=this;var L=A.get(cg);L.setContent(cQ);},_uiSetName:function(cQ){var A=this;var L=A.get(ag);L.set(aH,cQ);},_uiSetPredefinedValue:function(cQ){var A=this;var L=A.get(ag);L.val(cQ);},_uiSetRequired:function(cQ){var A=this;var L=A.get(bj);L.toggleClass(ai,!cQ);},_uiSetSelected:function(cQ){var L=this;L.get(aX).toggleClass(ba,cQ);if(!L.controlsToolbar){L._renderControlsToolbar();}var A=L.controlsToolbar.get(aX);if(cQ){A.show();}else{A.hide();}},_uiSetShowLabel:function(cQ){var A=this;var L=A.get(cg);L.toggleClass(ai,!cQ);},_uiSetTip:function(cQ){var A=this;var L=A.get(bI);L.toggleClass(ai,!cQ);A.toolTip.set(d,cQ);},_uiSetUnique:function(cS){var cQ=this;var cR=cQ.get(aX);var L=cQ.controlsToolbar;var A=cQ.getStrings();cR.toggleClass(G,cS);if(L){if(cS){L.remove(B);}else{L.add({handler:ck.bind(cQ._handleDuplicateEvent,cQ),icon:j,id:B,title:A[bB]});}}},_valueControlsToolbar:function(){var L=this;var A=L.getStrings();return{activeState:false,children:[{handler:ck.bind(L._handleEditEvent,L),icon:b4,id:o,title:A[a8]},{handler:ck.bind(L._handleDuplicateEvent,L),icon:j,id:B,title:A[bB]},{handler:ck.bind(L._handleDeleteEvent,L),icon:a0,id:h,title:A[bZ]}]};}}});ck.FormBuilderField=v;ck.FormBuilder.types["field"]=ck.FormBuilderField;var cb=ck.Lang,a7=cb.isArray,aG=cb.isNumber,b7=cb.isString,bl=ck.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),cB="button",cz="buttonType",b1=".",bT="",bC="field",f="fields",aN="form-builder-field",b6="form-builder-button-field",be="input",am="label",aH="name",cO="node",X="option",af="options",aV="predefinedValue",bF="proxy",b3="reset",bs="selected",aB="submit",aa=" ",cc="strings",aP="template",ag="templateNode",bV="text",ab="type",l="value",H=ck.getClassName,bH=H(bC,be),T=H(bC,be,bV),bW=H(aN),co=H(aN,cO),b2=H(bR,cy),bU='<input id="{id}" class="'+[co,bH].join(aa)+'" name="{name}" type="{type}" value="{value}" />',cP=[aB,b3,cB];var cn=ck.Component.create({NAME:b6,ATTRS:{acceptChildren:{value:false,readOnly:true},buttonType:{value:aB,validator:function(A){return ck.Array(cP).indexOf(A.toLowerCase())>-1;}},predefinedValue:{value:bl(aB)},showLabel:{value:false},template:{valueFn:function(){return bU;}}},UI_ATTRS:ck.FormBuilderField.UI_ATTRS.concat([cz]),CSS_PREFIX:bW,EXTENDS:ck.FormBuilderField,prototype:{getHTML:function(){var A=this;
return cb.sub(A.get(aP),{id:A.get(cw),label:A.get(am),name:A.get(aH),type:A.get(cz),value:A.get(aV)});},getPropertyModel:function(){var L=this;var A=L.getStrings();var cQ=ck.FormBuilderButtonField.superclass.getPropertyModel.apply(L,arguments);cQ.push({attributeName:cz,editor:new ck.RadioCellEditor({options:{"button":A[cB],"reset":A[b3],"submit":A[aB]}}),name:A[cz]});return cQ;},_uiSetButtonType:function(cQ){var A=this;var L=A.get(ag);L.setAttribute(ab,cQ);}}});ck.FormBuilderButtonField=cn;ck.FormBuilder.types["button"]=ck.FormBuilderButtonField;var cb=ck.Lang,a7=cb.isArray,bc=cb.isBoolean,aG=cb.isNumber,b7=cb.isString,a5="boolean",aO="checkbox",O="checked",b1=".",bT="",bC="field",cD="form-builder-checkbox-field",aN="form-builder-field",am="label",b="labels",aH="name",cO="node",aV="predefinedValue",aa=" ",aP="template",ag="templateNode",l="value",H=ck.getClassName,c=H(bC),aq=H(bC,aO),ch=H(bC,aA),bW=H(aN),cF=H(aN,aO),co=H(aN,cO),a3='<input id="{id}" class="'+[co,c,aq,ch].join(aa)+'" name="{name}" type="checkbox" value="{value}" {checked} />';var ad=ck.Component.create({NAME:cD,ATTRS:{dataType:{value:a5},predefinedValue:{setter:ck.DataType.Boolean.parse,value:false},template:{valueFn:function(){return a3;}}},CSS_PREFIX:bW,EXTENDS:ck.FormBuilderField,prototype:{renderUI:function(){var A=this;var cQ=A.get(ag);var L=A.get(cg);ck.FormBuilderCheckBoxField.superclass.renderUI.apply(A,arguments);L.insert(cQ,L,"before");},getPropertyModel:function(){var L=this;var A=L.getStrings();var cQ=ck.FormBuilderCheckBoxField.superclass.getPropertyModel.apply(L,arguments);cJ.each(cQ,function(cS,cR,cT){if(cS.attributeName===aV){cT[cR]={attributeName:aV,editor:new ck.RadioCellEditor({options:{"true":A[cu],"false":A[a9]}}),formatter:ck.bind(L._booleanFormatter,L),name:A[aV]};}});return cQ;},getHTML:function(){var A=this;var L=A.get(O);return cb.sub(A.get(aP),{checked:L?'checked="checked"':bT,id:A.get(cw),label:A.get(am),name:A.get(aH),value:A.get(aV)});},_uiSetPredefinedValue:function(cQ){var A=this;var L=A.get(ag);if(cQ){L.setAttribute(O,cQ);}else{L.removeAttribute(O);}}}});ck.FormBuilderCheckBoxField=ad;ck.FormBuilder.types.checkbox=ck.FormBuilderCheckBoxField;var cb=ck.Lang,aX="boundingBox",cI="contentBox",aS="container",cM="dataType",b1=".",aE="drop",bT="",Z="showLabel",bC="field",f="fields",bg="dropZoneNode",aN="form-builder-field",I="form-builder-fieldset-field",cw="id",t="icon",am="label",aH="name",cO="node",aV="predefinedValue",aa=" ",cc="strings",aP="template",ag="templateNode",bV="text",ab="type",l="value",b8="zone",H=ck.getClassName,bW=H(aN),co=H(aN,cO),ap=H(s,ct,aE,b8),aU='<fieldset id="{id}" class="'+[co].join(aa)+'"></fieldset>',k='<legend class="'+aR+'"></legend>';var C=ck.Component.create({NAME:I,ATTRS:{acceptChildren:{value:true,readOnly:true},dataType:{value:undefined},labelNode:{valueFn:function(){return ck.Node.create(k);}},template:{valueFn:function(){return aU;}}},UI_ATTRS:[g,am,Z],CSS_PREFIX:bW,EXTENDS:ck.FormBuilderField,prototype:{CONTENT_TEMPLATE:aU,getHTML:function(){var A=this;return cb.sub(A.get(aP),{id:A.get(cw)});},getPropertyModel:function(){var L=this;var A=L.getStrings();return[{attributeName:ab,editor:false,name:A[ab]},{attributeName:am,editor:new ck.TextCellEditor(),name:A[am]},{attributeName:Z,editor:new ck.RadioCellEditor({options:{"true":A[cu],"false":A[a9]}}),formatter:ck.bind(L._booleanFormatter,L),name:A[Z]}];},_uiSetAcceptChildren:function(cS){var A=this;var L=A.get(cI);var cR=A.get(bg);var cQ=L.one(b1+ap);if(cS&&!cQ){L.append(cR);}else{if(!cS&&cQ){cQ.remove();}else{if(cS&&cQ){A.set(bg,cQ);}}}A.get(ag).hide();}}});ck.FormBuilderFieldsetField=C;ck.FormBuilder.types["fieldset"]=ck.FormBuilderFieldsetField;var cb=ck.Lang,b1=".",bT="",bC="field",f="fields",aN="form-builder-field",cH="form-builder-file-upload-field",t="icon",cw="id",am="label",aH="name",cO="node",aV="predefinedValue",aa=" ",cc="strings",aP="template",ag="templateNode",bV="text",ab="type",l="value",H=ck.getClassName,bW=H(aN),co=H(aN,cO),b2=H(bR,cy),bO='<input id="{id}" class="'+[co].join(aa)+'" name="{name}" type="file" value="{value}" />';var P=ck.Component.create({NAME:cH,ATTRS:{template:{valueFn:function(){return bO;}}},CSS_PREFIX:bW,EXTENDS:ck.FormBuilderField,prototype:{getHTML:function(){var A=this;return cb.sub(A.get(aP),{id:A.get(cw),label:A.get(am),name:A.get(aH),value:A.get(aV)});}}});ck.FormBuilderFileUploadField=P;ck.FormBuilder.types["fileupload"]=ck.FormBuilderFileUploadField;var cv=ck.Lang,cJ=ck.Array,b7=cv.isString,bJ="data",bo="drag",aE="drop",bC="field",f="fields",aN="form-builder-field",Q="form-builder-multiple-choice-field",S="form-builder-options-editor",t="icon",cw="id",be="input",al="item",am="label",cA="multiple",aH="name",cO="node",X="option",bM="optionTemplate",af="options",aV="predefinedValue",E="render",aa=" ",aP="template",ag="templateNode",bV="text",ab="type",l="value",n=",",bN=" ",a4=n+bN,M="",H=ck.getClassName,x=function(L){var A={};cJ.each(L,function(cR,cQ,cS){A[cR.value]=cR.label;});return A;},bH=H(bC,be),T=H(bC,be,bV),bW=H(aN),co=H(aN,cO);var bq=ck.Component.create({NAME:S,EXTENDS:ck.RadioCellEditor,prototype:{initializer:function(){var A=this;A.after(E,function(){A._onEditEvent();});}}});var e=ck.Component.create({NAME:Q,ATTRS:{acceptChildren:{value:false,readOnly:true},options:{value:[{label:"option 1",value:"value 1"},{label:"option 2",value:"value 2"},{label:"option 3",value:"value 3"}]},optionTemplate:{value:'<option {selected} value="{value}">{label}</option>'}},UI_ATTRS:[g,aV,am,aH,af,Z],CSS_PREFIX:bW,EXTENDS:ck.FormBuilderField,prototype:{getPropertyModel:function(){var L=this;var cR=L.get(af);var A=L.getStrings();var cQ=ck.FormBuilderMultipleChoiceField.superclass.getPropertyModel.apply(L,arguments);cJ.each(cQ,function(cT,cS,cU){if(cT.attributeName===aV){cU[cS]=ck.merge(cT,{editor:new ck.RadioCellEditor({options:x(cR)}),formatter:function(cW){var cX=x(cR);var cV=cX[cW.record.get(bJ).value];if(!b7(cV)){cV=M;}return cV;}});}});cQ.push({attributeName:af,editor:new bq({editable:true,options:x(cR),inputFormatter:function(){var cS=[];
ck.each(this.get(af),function(cV,cT,cW){var cU={label:cV,value:cT};cJ.each(cR,function(cX){if(cX.value===cT){cU=ck.merge(cX,cU);}});cS.push(cU);});return cS;}}),formatter:function(cT){var cS=[];ck.each(cT.record.get(bJ).value,function(cV,cU,cW){cS.push(cV.label);});return cS.join(a4);},name:A[af]});return cQ;},_uiSetOptions:function(cR){var A=this;var cQ=A.get(aV);var L=[];ck.each(cR,function(cT,cS,cU){L.push(cv.sub(A.get(bM),{label:cT.label,selected:cT.value===cQ?'selected="selected"':M,value:cT.value}));});A.get(ag).setContent(L.join(M));}}});ck.FormBuilderMultipleChoiceField=e;ck.FormBuilder.types["multiple-choice"]=ck.FormBuilderMultipleChoiceField;var cb=ck.Lang,O="checked",aA="choice",aS="container",cI="contentBox",b1=".",bT="",bC="field",f="fields",aN="form-builder-field",bn="form-builder-radio-field",t="icon",cw="id",bw="inline",am="label",b="labels",aZ="left",aH="name",cO="node",K="optionsContainerNode",aV="predefinedValue",Y="radio",aa=" ",aP="template",ag="templateNode",l="value",H=ck.getClassName,c=H(bC),ch=H(bC,aA),aF=H(bC,Y),bW=H(aN),co=H(aN,cO),cq=H(aN,af,aS),aW=H(aN,Y),b2=H(bR,cy),ac='<div class="'+cq+'"></div>',a6='<div><input id="{id}" class="'+[c,ch,aF,co].join(aa)+'" name="{name}" type="radio" value="{value}" {checked} {disabled} /><label class="aui-field-label" for="{id}">{label}</label></div>';var i=ck.Component.create({NAME:bn,ATTRS:{name:{value:Y},template:{valueFn:function(){return a6;}}},CSS_PREFIX:bW,EXTENDS:ck.FormBuilderMultipleChoiceField,prototype:{getHTML:function(){return ac;},_uiSetDisabled:function(cQ){var A=this;var L=A.get(ag);L.all(be).each(function(cR){if(cQ){cR.setAttribute(bS,cQ);}else{cR.removeAttribute(bS);}});},_uiSetOptions:function(cR){var A=this;var L=0;var cQ=A.get(ag);cQ.setContent(bT);ck.each(cR,function(cT,cS,cU){cQ.append(ck.Node.create(cb.sub(a6,{checked:cT.value===A.get(aV)?'checked="checked"':bT,disabled:A.get(bS)?'disabled="disabled"':bT,id:A.get(cw)+L++,label:cT.label,name:A.get(aH),value:cT.value})));});}}});ck.FormBuilderRadioField=i;ck.FormBuilder.types.radio=ck.FormBuilderRadioField;var cb=ck.Lang,a7=cb.isArray,aG=cb.isNumber,b7=cb.isString,cB="button",b1=".",bT="",bC="field",f="fields",aN="form-builder-field",cj="form-builder-select-field",t="icon",cw="id",be="input",am="label",cA="multiple",aH="name",cO="node",X="option",af="options",aV="predefinedValue",bs="selected",ca="selectedIndex",aa=" ",aP="template",ag="templateNode",bV="text",ab="type",l="value",H=ck.getClassName,bH=H(bC,be),T=H(bC,be,bV),bW=H(aN),co=H(aN,cO),b2=H(bR,cy),bQ='<select id="{id}" class="'+[co].join(aa)+'" name="{name}" value="{value}"></select>';var ak=ck.Component.create({NAME:cj,ATTRS:{multiple:{setter:ck.DataType.Boolean.parse,value:false},template:{valueFn:function(){return bQ;}}},UI_ATTRS:ck.FormBuilderField.UI_ATTRS.concat([cA]),CSS_PREFIX:bW,EXTENDS:ck.FormBuilderMultipleChoiceField,prototype:{getHTML:function(){var A=this;return cb.sub(A.get(aP),{id:A.get(cw),label:A.get(am),name:A.get(aH),value:A.get(aV)});},getPropertyModel:function(){var L=this;var A=L.getStrings();var cQ=ck.FormBuilderSelectField.superclass.getPropertyModel.apply(L,arguments);cQ.push({attributeName:cA,editor:new ck.RadioCellEditor({options:{"true":A[cu],"false":A[a9]}}),formatter:ck.bind(L._booleanFormatter,L),name:A[cA]});return cQ;},_uiSetMultiple:function(cQ){var A=this;var L=A.get(ag);if(cQ){L.setAttribute(cA,cA);}else{L.removeAttribute(cA);}}}});ck.FormBuilderSelectField=ak;ck.FormBuilder.types.select=ck.FormBuilderSelectField;var cb=ck.Lang,aX="boundingBox",aS="container",cI="contentBox",b1=".",bT="",bC="field",f="fields",aN="form-builder-field",bf="form-builder-text-field",t="icon",cw="id",be="input",am="label",cK="large",cp="medium",aH="name",cO="node",bm="portalLayout",aV="predefinedValue",cl="small",aa=" ",aP="template",ag="templateNode",bV="text",l="value",bL="width",H=ck.getClassName,bH=H(bC,be),T=H(bC,be,bV),bW=H(aN),co=H(aN,cO),bU='<input id="{id}" class="'+[co,bH,T].join(aa)+'" name="{name}" type="text" value="{value}" />',aQ={25:"small",50:"medium",100:"large"};var bK=ck.Component.create({NAME:bf,ATTRS:{template:{valueFn:function(){return bU;}},width:{setter:ck.DataType.String.evaluate,value:25}},CSS_PREFIX:bW,EXTENDS:ck.FormBuilderField,prototype:{getHTML:function(){var A=this;return cb.sub(A.get(aP),{id:A.get(cw),label:A.get(am),name:A.get(aH),value:A.get(aV),width:A.get(bL)});},getPropertyModel:function(){var L=this;var A=L.getStrings();var cQ=ck.FormBuilderTextField.superclass.getPropertyModel.apply(L,arguments);cQ.push({attributeName:bL,editor:new ck.RadioCellEditor({options:{25:A[cl],50:A[cp],100:A[cK]}}),formatter:function(cS){var cR=cS.record.get(bJ).value;return A[aQ[cR]];},name:A[bL]});return cQ;},_uiSetWidth:function(cQ){var A=this;var L=A.get(ag);L.addClass(H("w"+cQ));L.removeClass(H("w"+A.prevWidth));A.prevWidth=cQ;}}});ck.FormBuilderTextField=bK;ck.FormBuilder.types["text"]=ck.FormBuilderTextField;var cb=ck.Lang,a7=cb.isArray,aG=cb.isNumber,b7=cb.isString,b1=".",cC="form-builder-textarea-field",H=ck.getClassName,c=H(bC),bG=H(bC,bV),R=H(bC,au),bW=H(aN),co=H(aN,cO),ao='<textarea id="{id}" class="'+[co,c,bG,R].join(aa)+'" name="{name}">{value}</textarea>';var aT=ck.Component.create({NAME:cC,ATTRS:{template:{valueFn:function(){return ao;}}},CSS_PREFIX:bW,EXTENDS:ck.FormBuilderTextField,prototype:{getPropertyModel:function(){var A=this;var cQ=A.get(af);var L=ck.FormBuilderTextAreaField.superclass.getPropertyModel.apply(A,arguments);cJ.each(L,function(cS,cR,cT){if(cS.attributeName===aV){cT[cR].editor=new ck.TextAreaCellEditor();}});return L;}}});ck.FormBuilderTextAreaField=aT;ck.FormBuilder.types["textarea"]=ck.FormBuilderTextAreaField;},"@VERSION@",{requires:["aui-datatype","aui-panel","aui-tooltip"],skinnable:true});AUI.add("aui-form-builder",function(a){},"@VERSION@",{use:["aui-form-builder-base","aui-form-builder-field"],skinnable:true});