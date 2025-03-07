import{a as b}from"./chunk-Y6LGBXLQ.js";import{a as se,b as pe}from"./chunk-4N7SC5UD.js";import{a as ue,c as ge}from"./chunk-IJTMJMYD.js";import{b as fe}from"./chunk-MTGUTNBY.js";import{a as O}from"./chunk-HD6QFJ6B.js";import{a as Z,b as ee,c as ie,d as ne,f as ae,g as v,h as ce}from"./chunk-UKZT5LYH.js";import{a as U,b as W,g as X,h as Y,i as te,k as oe}from"./chunk-4BQ3I3IV.js";import"./chunk-Q64FFBLU.js";import{a as de,c as me,f as le}from"./chunk-2FMEKLYD.js";import{I as Q,O as re,P as F}from"./chunk-ADHHZP6M.js";import{d as k}from"./chunk-ID222W6O.js";import"./chunk-I2VACIZO.js";import"./chunk-EAL2B4IN.js";import{b as $,d as A,f as q,g as G,j as V,k as H,m as J,n as I,p as K}from"./chunk-PXIP7OAW.js";import"./chunk-OMQHCXRE.js";import{o as L,q as x}from"./chunk-FHMWGGDF.js";import{$b as S,Cb as P,Cc as z,Eb as _,Fb as M,Gb as r,Hb as o,Ib as p,Kb as N,Ma as h,Nb as u,Pb as T,_b as a,ab as m,ac as R,bb as d,fa as s,fc as g,ka as f,sb as j,ta as w,ua as D,xb as C}from"./chunk-LBNGVE6L.js";var Se=(i,t)=>t.id;function xe(i,t){if(i&1&&(r(0,"mat-option",7)(1,"div",13),a(2),o()()),i&2){let e=t.$implicit;C("value",e.id),m(2),R(" ",e.name," ")}}function ke(i,t){i&1&&(r(0,"mat-error"),a(1,"Project Name is required"),o())}function Oe(i,t){i&1&&(r(0,"mat-error"),a(1,"Project Admin is required"),o())}function Ie(i,t){i&1&&a(0," Create Project ")}function Fe(i,t){i&1&&(r(0,"div",12),p(1,"mat-spinner",14),r(2,"span"),a(3,"Connecting..."),o()())}var y=class i{constructor(t,e,n,c,l,B){this.fb=t;this.router=e;this.snackBar=n;this.authService=c;this.dashboardService=l;this.platformId=B;this.isBrowser=x(this.platformId),this.organizations=this.dashboardService.organizations(),this.currentOrgId=this.dashboardService.currentOrganization(),this.addProjectForm=this.fb.group({name:["",[A.required]],admin:[""],organization:["",[A.required]],description:[""]})}dialogRef=s(ue);addProjectForm;hideSecret=!0;loading=!1;isBrowser;currentOrgId;organizations;onCancel(){this.dialogRef.close()}onAdd(){this.addProjectForm.valid&&(console.log("this.form.value",this.addProjectForm),this.dialogRef.close(this.addProjectForm))}static \u0275fac=function(e){return new(e||i)(d(I),d(k),d(v),d(O),d(b),d(h))};static \u0275cmp=f({type:i,selectors:[["app-project-add"]],standalone:!0,features:[g],decls:29,vars:5,consts:[[1,"container-fluid"],[1,"row","g-4"],[1,"col-12","col-md-12","col-lg-12"],[1,"storage-card"],[1,"d-flex","flex-column","gap-4",3,"ngSubmit","formGroup"],["appearance","outline"],["formControlName","organization",2,"color","white"],[3,"value"],["matInput","","formControlName","name","type","text","placeholder","Enter your Project Name"],["matInput","","formControlName","admin","type","text","placeholder","Enter your Project Admin"],["matInput","","type","text","formControlName","description","placeholder","Enter your description","rows","4"],["mat-flat-button","",1,"submit-button","py-3","gradient-btn",3,"disabled"],[1,"d-flex","align-items-center","justify-content-center","gap-2"],[1,"d-flex","align-items-center","gap-2"],["diameter","20"]],template:function(e,n){if(e&1&&(r(0,"div",0)(1,"div",1)(2,"div",2)(3,"mat-card",3)(4,"mat-card-content")(5,"form",4),u("ngSubmit",function(){return n.onAdd()}),r(6,"mat-form-field",5)(7,"mat-label"),a(8,"Organization"),o(),r(9,"mat-select",6),_(10,xe,3,2,"mat-option",7,Se),o()(),r(12,"mat-form-field",5)(13,"mat-label"),a(14,"Project Name"),o(),p(15,"input",8),j(16,ke,2,0,"mat-error"),o(),r(17,"mat-form-field",5)(18,"mat-label"),a(19,"Project Admin"),o(),p(20,"input",9),j(21,Oe,2,0,"mat-error"),o(),r(22,"mat-form-field",5)(23,"mat-label"),a(24,"Description"),o(),p(25,"textarea",10),o(),r(26,"button",11),j(27,Ie,1,0)(28,Fe,4,0,"div",12),o()()()()()()()),e&2){let c,l;m(5),C("formGroup",n.addProjectForm),m(5),M(n.organizations),m(6),P((c=n.addProjectForm.get("name"))!=null&&c.hasError("required")&&((c=n.addProjectForm.get("name"))!=null&&c.touched)?16:-1),m(5),P((l=n.addProjectForm.get("admin"))!=null&&l.hasError("required")&&((l=n.addProjectForm.get("admin"))!=null&&l.touched)?21:-1),m(5),C("disabled",n.addProjectForm.invalid||n.loading),m(),P(n.loading?28:27)}},dependencies:[L,le,de,me,F,fe,K,V,$,q,G,H,J,Y,X,U,W,ee,Z,oe,te,ae,ne,ie,ce,pe,se,Q],styles:["[_nghost-%COMP%]{display:block;color:#fff}[_ngcontent-%COMP%]:is()   .mat-mdc-form-field[_ngcontent-%COMP%]{width:100%}[_ngcontent-%COMP%]:is()   .mat-mdc-dialog-surface[_ngcontent-%COMP%]{background:#ffffff1a!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}[_ngcontent-%COMP%]:is()   [_ngcontent-%COMP%]:is(.mdc-text-field--outlined:not(.mdc-text-field--disabled)   .mdc-notched-outline__leading[_ngcontent-%COMP%], .mdc-text-field--outlined[_ngcontent-%COMP%]:not(.mdc-text-field--disabled)   .mdc-notched-outline__notch[_ngcontent-%COMP%], .mdc-text-field--outlined[_ngcontent-%COMP%]:not(.mdc-text-field--disabled)   .mdc-notched-outline__trailing)[_ngcontent-%COMP%]{border-color:#ffffff4d}[_ngcontent-%COMP%]:is()   .mat-mdc-form-field-focus-overlay[_ngcontent-%COMP%]{background-color:#ffffff1a}.urls-container[_ngcontent-%COMP%]{background:#ffffff0d;border-radius:8px;padding:16px;border:1px solid rgba(255,255,255,.1)}mat-label[_ngcontent-%COMP%]{color:#fff}.submit-button[_ngcontent-%COMP%]{background:linear-gradient(to right,#00e1ff,#43ff8e);color:#fff;border:none}.submit-button[_ngcontent-%COMP%]:disabled{opacity:.6;background:#ffffff1a}.remove-btn[_ngcontent-%COMP%]{background:linear-gradient(to right,#ff4d6d,#ff758f);border:none}"]})};var ye=(i,t)=>t.id;function Ee(i,t){if(i&1){let e=N();r(0,"tr")(1,"th",5),a(2),o(),r(3,"td"),a(4),o(),r(5,"td"),a(6),o(),r(7,"td")(8,"mat-icon",6),u("click",function(){let c=w(e).$implicit,l=T();return D(l.deleteProject(c.id))}),a(9,"delete_sweep"),o()()()}if(i&2){let e=t.$implicit,n=t.$index;m(2),S(n+1),m(2),S(e.name),m(2),S(e.description)}}function Be(i,t){i&1&&(r(0,"tr")(1,"td",7),a(2,"No projects found"),o()())}var E=class i{projects;snackBar=s(v);dashboardService=s(b);constructor(){this.dashboardService.loadProjects(),this.projects=this.dashboardService.projects,z(()=>{this.dashboardService.currentOrganization()&&this.dashboardService.loadProjects()})}deleteProject(t){confirm("Are you sure you want to delete this project?")&&this.dashboardService.deleteProject(t).subscribe({next:()=>{this.snackBar.open("Organization deleted successfully","Close",{duration:3e3})},error:e=>{console.error("Error deleting project:",e),this.snackBar.open("Error deleting project","Close",{duration:3e3})}})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["app-project-list"]],standalone:!0,features:[g],decls:18,vars:1,consts:[[1,"container-fluid"],[1,"row","g-4"],[1,"col-12"],[1,"table","table-striped","table-dark",2,"width","100%"],["scope","col"],["scope","row"],[2,"cursor","pointer",3,"click"],["colspan","4",1,"text-center"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"div",1)(2,"div",2)(3,"table",3)(4,"thead")(5,"tr")(6,"th",4),a(7,"#"),o(),r(8,"th",4),a(9,"Project Name"),o(),r(10,"th",4),a(11,"Description"),o(),r(12,"th",4),a(13,"Remove"),o()()(),r(14,"tbody"),_(15,Ee,10,3,"tr",null,ye,!1,Be,3,0,"tr"),o()()()()()),e&2&&(m(15),M(n.projects()))},dependencies:[F,re]})};var he=class i{constructor(t,e,n,c,l,B){this.fb=t;this.router=e;this.snackBar=n;this.authService=c;this.dashboardService=l;this.platformId=B;this.isBrowser=x(this.platformId)}hideSecret=!0;loading=!1;isBrowser;dialog=s(ge);openDialog(){var t=this.dialog.open(y,{width:"450px",panelClass:"custom-dialog-container",backdropClass:"custom-backdrop"});t.afterClosed().subscribe(e=>{if(e){let n=e.controls.name.value,c=e.controls.admin.value,l=e.controls.organization.value,B=e.controls.description.value;console.log(e),this.addProject(n,c,l,B)}})}addProject(t,e,n,c){console.log("name, descr",t,c),this.loading=!0,this.dashboardService.addProject(t,e,n,c).subscribe({next:()=>{this.dashboardService.loadProjects(),this.snackBar.open("project added successfully","Close",{duration:3e3}),this.loading=!1},error:l=>{console.error("Error adding project:",l),this.snackBar.open("Error adding project","Close",{duration:3e3}),this.loading=!1}})}static \u0275fac=function(e){return new(e||i)(d(I),d(k),d(v),d(O),d(b),d(h))};static \u0275cmp=f({type:i,selectors:[["app-projects"]],standalone:!0,features:[g],decls:8,vars:0,consts:[[1,"container-fluid"],[1,"row"],[1,"col-12",2,"display","flex","justify-content","space-between"],[1,"mb-4"],[1,"btn","btn-primary","gradient-btn",2,"cursor","pointer","margin","2.5px","height","fit-content",3,"click"]],template:function(e,n){e&1&&(r(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),a(4,"Projects"),o(),r(5,"button",4),u("click",function(){return n.openDialog()}),a(6," +Add Project"),o()()(),p(7,"app-project-list"),o())},dependencies:[E],styles:["[_nghost-%COMP%]{display:block;padding:24px;color:#fff}.storage-card[_ngcontent-%COMP%]{background:#ffffff1a;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);color:#fff}.text-muted[_ngcontent-%COMP%], input[_ngcontent-%COMP%]{color:#fff!important}mat-card-header[_ngcontent-%COMP%]{margin-bottom:16px}mat-icon[_ngcontent-%COMP%]{color:#fff}mat-label[_ngcontent-%COMP%]{color:#fff}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{font-size:2rem}"]})};export{he as ProjectsComponent};
