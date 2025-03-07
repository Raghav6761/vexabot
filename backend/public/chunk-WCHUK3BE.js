import{a as ne,b as ae}from"./chunk-4N7SC5UD.js";import{a as le,c as de}from"./chunk-IJTMJMYD.js";import{b as R}from"./chunk-MTGUTNBY.js";import{a as P}from"./chunk-32FL5DMP.js";import{a as Z,b as I,c as oe,d as B,f as w,g as D,h as T}from"./chunk-UKZT5LYH.js";import{a as Q,b as U,c as W,d as X,g as Y,h as E,i as ee,j as te,k as A}from"./chunk-4BQ3I3IV.js";import"./chunk-Q64FFBLU.js";import{a as ie,c as re,f as j}from"./chunk-2FMEKLYD.js";import{I as J,O,P as g}from"./chunk-ADHHZP6M.js";import{d as y}from"./chunk-ID222W6O.js";import"./chunk-I2VACIZO.js";import"./chunk-MDC4N2GR.js";import{b as G,d as c,f as L,g as z,j as V,k as $,m as H,n as F,p as k}from"./chunk-PXIP7OAW.js";import"./chunk-OMQHCXRE.js";import{o as _,q as x}from"./chunk-FHMWGGDF.js";import{$b as q,Cb as v,Gb as e,Hb as t,Ib as p,Ma as M,Nb as S,_b as o,ab as m,bb as l,fa as C,fc as f,ka as u,sb as b,xb as h}from"./chunk-LBNGVE6L.js";var N=class a{static \u0275fac=function(r){return new(r||a)};static \u0275cmp=u({type:a,selectors:[["app-cloud-storage-list"]],standalone:!0,features:[f],decls:55,vars:0,consts:[[1,"container-fluid"],[1,"row","g-4"],[1,"col-12"],[1,"table","table-striped","table-dark",2,"width","100%"],["scope","col"],["scope","row"]],template:function(r,i){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"table",3)(4,"thead")(5,"tr")(6,"th",4),o(7,"#"),t(),e(8,"th",4),o(9,"Connected Application"),t(),e(10,"th",4),o(11,"Storage (in mb)"),t(),e(12,"th",4),o(13,"Remove"),t()()(),e(14,"tbody")(15,"tr")(16,"th",5),o(17,"1"),t(),e(18,"td"),o(19,"Microsoft Azure"),t(),e(20,"td"),o(21,"4mb"),t(),e(22,"td")(23,"mat-icon"),o(24,"delete_sweep"),t()()(),e(25,"tr")(26,"th",5),o(27,"2"),t(),e(28,"td"),o(29,"Google Cloud"),t(),e(30,"td"),o(31,"10mb"),t(),e(32,"td")(33,"mat-icon"),o(34,"delete_sweep"),t()()(),e(35,"tr")(36,"th",5),o(37,"3"),t(),e(38,"td"),o(39,"file4.png"),t(),e(40,"td"),o(41,"50mb"),t(),e(42,"td")(43,"mat-icon"),o(44,"delete_sweep"),t()()(),e(45,"tr")(46,"th",5),o(47,"4"),t(),e(48,"td"),o(49,"file4.png"),t(),e(50,"td"),o(51,"550mb"),t(),e(52,"td")(53,"mat-icon"),o(54,"delete_sweep"),t()()()()()()()())},dependencies:[g,O],styles:["h2[_ngcontent-%COMP%]{font-size:1.8rem}"]})};function Ce(a,n){a&1&&(e(0,"mat-error"),o(1,"API Key is required"),t())}function Me(a,n){a&1&&(e(0,"mat-error"),o(1,"Secret Key is required"),t())}function be(a,n){a&1&&o(0," Connect ")}function he(a,n){a&1&&(e(0,"div",16),p(1,"mat-spinner",17),e(2,"span"),o(3,"Connecting..."),t()())}var K=class a{constructor(n,r,i,d,s){this.fb=n;this.router=r;this.snackBar=i;this.authService=d;this.platformId=s;this.isBrowser=x(this.platformId),this.cloudStorageForm=this.fb.group({apiType:["",[c.required]],apiKey:["",[c.required]],apiSecret:["",[c.required]]})}dialogRef=C(le);cloudStorageForm;hideSecret=!0;loading=!1;isBrowser;onCancel(){this.dialogRef.close()}onAdd(){this.cloudStorageForm.valid&&(console.log("this.form.value",this.cloudStorageForm),this.dialogRef.close(this.cloudStorageForm))}static \u0275fac=function(r){return new(r||a)(l(F),l(y),l(D),l(P),l(M))};static \u0275cmp=u({type:a,selectors:[["app-add-cloud-storage"]],standalone:!0,features:[f],decls:39,vars:7,consts:[[1,"container-fluid"],[1,"row","g-4"],[1,"col-12","col-md-12","col-lg-12"],[1,"storage-card"],[1,"d-flex","flex-column","gap-4",3,"ngSubmit","formGroup"],["appearance","outline"],["formControlName","apiType",2,"color","white"],["value","aws"],[1,"d-flex","align-items-center","gap-2"],["value","gcp"],["value","azure"],["matInput","","formControlName","apiKey","type","apiKey","placeholder","Enter your api key"],["matPrefix","",1,"me-2"],["matInput","","formControlName","apiSecret","placeholder","Enter your ApiSecret",3,"type"],["mat-icon-button","","matSuffix","","type","button",3,"click"],["mat-flat-button","",1,"submit-button","py-3","gradient-btn",3,"disabled"],[1,"d-flex","align-items-center","justify-content-center","gap-2"],["diameter","20"]],template:function(r,i){if(r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"mat-card",3)(4,"mat-card-content")(5,"form",4),S("ngSubmit",function(){return i.onAdd()}),e(6,"mat-form-field",5)(7,"mat-label"),o(8,"API Type"),t(),e(9,"mat-select",6)(10,"mat-option",7)(11,"div",8),o(12," Amazon S3 "),t()(),e(13,"mat-option",9)(14,"div",8),o(15," Google Cloud Platform "),t()(),e(16,"mat-option",10)(17,"div",8),o(18," Microsoft Azure "),t()()()(),e(19,"mat-form-field",5)(20,"mat-label"),o(21,"API Key"),t(),p(22,"input",11),e(23,"mat-icon",12),o(24,"vpn_key"),t(),b(25,Ce,2,0,"mat-error"),t(),e(26,"mat-form-field",5)(27,"mat-label"),o(28,"API Secret"),t(),p(29,"input",13),e(30,"mat-icon",12),o(31,"lock"),t(),e(32,"button",14),S("click",function(){return i.hideSecret=!i.hideSecret}),e(33,"mat-icon"),o(34),t()(),b(35,Me,2,0,"mat-error"),t(),e(36,"button",15),b(37,be,1,0)(38,he,4,0,"div",16),t()()()()()()()),r&2){let d,s;m(5),h("formGroup",i.cloudStorageForm),m(20),v((d=i.cloudStorageForm.get("apiKey"))!=null&&d.hasError("required")&&((d=i.cloudStorageForm.get("apiKey"))!=null&&d.touched)?25:-1),m(4),h("type",i.hideSecret?"password":"text"),m(5),q(i.hideSecret?"visibility_off":"visibility"),m(),v((s=i.cloudStorageForm.get("apiSecret"))!=null&&s.hasError("required")&&((s=i.cloudStorageForm.get("apiSecret"))!=null&&s.touched)?35:-1),m(),h("disabled",i.cloudStorageForm.invalid||i.loading),m(),v(i.loading?38:37)}},dependencies:[_,j,ie,re,g,O,R,k,V,G,L,z,$,H,E,Y,Q,U,W,X,I,Z,A,ee,te,w,B,oe,T,ae,ne,J],styles:["[_nghost-%COMP%]{display:block;color:#fff}[_ngcontent-%COMP%]:is()   .mat-mdc-form-field[_ngcontent-%COMP%]{width:100%}[_ngcontent-%COMP%]:is()   .mat-mdc-dialog-surface[_ngcontent-%COMP%]{background:#ffffff1a!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}[_ngcontent-%COMP%]:is()   [_ngcontent-%COMP%]:is(.mdc-text-field--outlined:not(.mdc-text-field--disabled)   .mdc-notched-outline__leading[_ngcontent-%COMP%], .mdc-text-field--outlined[_ngcontent-%COMP%]:not(.mdc-text-field--disabled)   .mdc-notched-outline__notch[_ngcontent-%COMP%], .mdc-text-field--outlined[_ngcontent-%COMP%]:not(.mdc-text-field--disabled)   .mdc-notched-outline__trailing)[_ngcontent-%COMP%]{border-color:#ffffff4d}[_ngcontent-%COMP%]:is()   .mat-mdc-form-field-focus-overlay[_ngcontent-%COMP%]{background-color:#ffffff1a}.urls-container[_ngcontent-%COMP%]{background:#ffffff0d;border-radius:8px;padding:16px;border:1px solid rgba(255,255,255,.1)}mat-label[_ngcontent-%COMP%]{color:#fff}.submit-button[_ngcontent-%COMP%]{background:linear-gradient(to right,#00e1ff,#43ff8e);color:#fff;border:none}.submit-button[_ngcontent-%COMP%]:disabled{opacity:.6;background:#ffffff1a}.remove-btn[_ngcontent-%COMP%]{background:linear-gradient(to right,#ff4d6d,#ff758f);border:none}"]})};var se=class a{constructor(n,r,i,d,s){this.fb=n;this.router=r;this.snackBar=i;this.authService=d;this.platformId=s;this.isBrowser=x(this.platformId),this.cloudStorageForm=this.fb.group({apiType:["",[c.required]],apiKey:["",[c.required]],apiSecret:["",[c.required]]})}cloudStorageForm;hideSecret=!0;loading=!1;isBrowser;dialog=C(de);openDialog(){console.log("values : ",this.cloudStorageForm);var n=this.dialog.open(K,{width:"450px",data:{startTime:"this.form.get(`${index}_2`).value "},panelClass:"custom-dialog-container",backdropClass:"custom-backdrop"});n.afterClosed().subscribe(r=>{r&&this.addCloudConnection("type","client key","secret key")})}addCloudConnection(n,r,i){console.log("type, secret, key",n,r,i)}onSubmit(){this.cloudStorageForm.valid?(this.loading=!0,this.authService.login(this.cloudStorageForm.value),this.authService.login(this.cloudStorageForm.value).subscribe({next:()=>this.router.navigate(["/talk"]),error:n=>{console.error("Login failed: ",n),this.loading=!1}})):this.cloudStorageForm.markAllAsTouched()}static \u0275fac=function(r){return new(r||a)(l(F),l(y),l(D),l(P),l(M))};static \u0275cmp=u({type:a,selectors:[["app-cloud-storage"]],standalone:!0,features:[f],decls:10,vars:0,consts:[[1,"container-fluid"],[1,"row"],[1,"col-12",2,"display","flex","justify-content","space-between"],[1,"mb-4"],[1,"btn","btn-primary","gradient-btn",2,"cursor","pointer","margin","2.5px","height","fit-content",3,"click"],[1,"row","g-4"]],template:function(r,i){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),o(4,"Cloud Storage"),t(),e(5,"button",4),S("click",function(){return i.openDialog()}),o(6," +Add Connection"),t()()(),e(7,"div",5),p(8,"br"),t(),p(9,"app-cloud-storage-list"),t())},dependencies:[_,j,g,R,k,E,I,A,w,B,T,N],styles:["[_nghost-%COMP%]{display:block;padding:24px;color:#fff}.storage-card[_ngcontent-%COMP%]{background:#ffffff1a;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);color:#fff}.text-muted[_ngcontent-%COMP%], input[_ngcontent-%COMP%]{color:#fff!important}mat-card-header[_ngcontent-%COMP%]{margin-bottom:16px}mat-icon[_ngcontent-%COMP%]{color:#fff}mat-label[_ngcontent-%COMP%]{color:#fff}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{font-size:2rem}"]})};export{se as CloudStorageComponent};
