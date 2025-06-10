/* variables */
var data = { last: "", cmds: {}, modules: [], vars: { debug: 0 } }
var id = 0

/* utils */
const utils = {
   color: (text, color) => {
      return `<span style="color: ${color};">${text}</span>`;
   }
}

/* functions */
function addToArray(array = [], value) {
   array.push(value)
}
function setObjectValue(object = {}, key, value) {
   object[key] = value;
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
   create: (obj = {}) => {
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
         action.echo(`${tag}" not found`, { color: "red" });
         return;
      }
      data.cmds[tag].run(args);
      $("#input").val("");
   }
}

/* action api */
const action = {
   echo: (text, opts = {}) => {
      if(!opts.asRaw){
      Object.keys(data.vars).forEach(key => {
         text = text.replace(new RegExp(`%${key}%`, "g"), data.vars[key]);
      });
   }
      text = text.replace(/\n/g, `<br />`);
      let style = `color: ${opts.color}`;

      id++;
      $("#feed").append(`<li id="${id}" style="${style}">${text}</li>`)
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


/* module api */
const module = {
   add: (module, callback = () => {}) => {
	let color = "lightblue"
	
      if (data.modules.indexOf(module) < 0) {
         $.get(`modules/${module}.js`, (script) => {
               $("head").append(`<script>${script}</script>`);
               addToArray(data.modules, module);
               vars.get("debug") >= 1 ? action.echo(`${utils.color(`[Module]`, color)} ${module} loaded`, "green") : "";
               load();
               callback(true);
            })
            .fail(function() {
               vars.get("debug") >= 1 ? action.echo(`${utils.color(`[Module]`, color)} ${module} not found`, "red") : "";
            });
      }
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
