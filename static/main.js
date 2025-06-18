// Version: 2
// Added action.clickable

/* variables */
var data = { last: "", cmds: {}, moduleDeps: {}, moduleList: [], moduleUrls: [], vars: { debug: 0 } }
var id = 0

/* utils */
const utils = {
   color: (text, color) => {
      return `<span style="color: ${color};">${text}</span>`;
   },
   addToArray: (array = [], value) => {
   array.push(value)
   },
   setObjectValue: (object = {}, key, value) => {
   object[key] = value;
},
 randNumber: (min, max) => {
    if (min >= max) {
      new Error("Min needs to be less then Max");
    }
    
  return Math.floor(Math.random() * (max - min) ) + min;
}
}

/* variable api */
const vars = {
   set: (key, value) => {
      data.vars[key] = value || null;
   },
   get: (key) => {
      return data.vars[key] || null;
   }
}

/* command api */
const cmd = {
   create: (obj = {
      tag: "",
      help: "",
      category: "",
      run: (args) => {}
   }) => {
      let color = "lightblue"
      
      id++;
      obj.id = id;
      data.cmds[obj.tag] = obj;
      vars.get("debug") >= 2 ? action.echo(`${utils.color(`[Command]`, color)} ${obj.tag} registered`, "green") : "";
      if (obj.aliases) {
         obj.aliases.forEach(tag => {
            id++;
            data.cmds[tag] = { tag, run: data.cmds[obj.tag].run, hidden: true, parent: obj.tag, id: `${obj.uid}${id}` }
            vars.get("debug") >= 2 ? action.echo(`${utils.color(`[Command]`, color)} ${tag} => ${obj.tag} registered`, "green") : "";
         })
      }
   },
   remove: (cmd) => {
      if (data.cmds[cmd]) {
         delete data.cmds[cmd]
      }
   },
   run: (tag, args) => {
      if (data.cmds[tag] === undefined) {
         action.echo(`Command ${tag} not found`, { color: "orange" });
         return;
      }
      data.cmds[tag].run(args);
      $("#input").val("");
   }
}

/* action api */
const action = {
   echo: (text, opts = {}) => {
      if (!opts.asRaw) {
         Object.keys(data.vars).forEach(key => {
            text = text.replace(new RegExp(`%${key}%`, "g"), data.vars[key]);
         });
      }
      text = text.replace(/\n/g, `<br />`);
      let style = `color: ${opts.color}`;
      
      id++;
      $("#feed").append(`<li id="${id}" style="${style}">${text}</li>`)
   },
   clickable: (text, run = () => {}) => {
      elem = $(`<span>${text}</span>`);
      elem.click(run);
      return elem.prop("outerHTML");
   },
   prompt: (prompt, callback) => {
      vars.set("_prompt", { callback });
      $("#prompt").text(prompt + ":");
   },
   clear: () => { $("#feed").html("") },
   prefetch: (host) => {
      $("head").append(`<link rel="dns-prefetch" href="${host}" /><link rel="prefetch" href="${host}" />`);
      vars.get("debug") >= 3 ? action.echo(`${utils.color(`[Prefetch]`, "blue")} ${host}`, "green") : "";
   }
}

const module = {
   add: (module, callback = () => {}) => {
      let color = "lightblue"
      const isHttp = new RegExp("http");
      const moduleUrl = isHttp.test(module) ? module : `modules/${module}.js`;
      
      if (data.moduleUrls.indexOf(moduleUrl) > -1) {
         return;
      }
      
         $.get(moduleUrl, (script) => {
               const { name, deps } = meta;
               
               $("head").append(`<script>${script}</script>`);
               utils.setObjectValue(data.moduleDeps, name, deps);
               utils.addToArray(data.moduleList, name);
               utils.addToArray(data.moduleUrls, moduleUrl);
               vars.get("debug") >= 1 ? action.echo(`${utils.color(`[Module]`, color)} ${name} loaded`, "green") : "";
               load();
               callback(true, name);
            })
            .fail(function() {
               vars.get("debug") >= 1 ? action.echo(`${utils.color(`[Module]`, color)} ${module} not found`, "orange") : "";
            });
   },
   list: () => {
      return new Set(data.moduleList);
   },
   listDeps: (module) => {
      return data.moduleDeps[module] || [];
   },
   remove: (module) => {
      vars.get("debug") >= 1 ? action.echo(`${utils.color(`[Module]`, color)} ${module} removed`, "green") : "";
   }
}

/* on send event */
$(document).ready(() => {
   $("#input").keyup(function(e) {
      e.preventDefault();
      if (e.keyCode == 13) {
         let val = $("#input").val();
         let vals = val.split(" ");
         data.last = val;
         
         $("#input").val("");
         
         if (vars.get("_prompt")) {
            $("#prompt").text("$");
            vars.get("_prompt").callback(val);
            vars.set("_prompt", null)
            return;
         }
         
         action.echo(`${utils.color("> ", "lightgrey")} ${val}`);
         cmd.run(vals.splice(0, 1)[0], vals);
      }
      if (e.keyCode == 38) {
         $("#input").val(data.last);
      }
   });
});