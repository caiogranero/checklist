# checklist

CodeClimate badge: [![codeclimate](https://codeclimate.com/github/caiogranero/desafio-vitta/badges/gpa.svg)](https://codeclimate.com/github/caiogranero/desafio-vitta)

### What's this?

This is a TODO List, build in [Vue.js]

### How do i run this app?

First, install dependencies running `npm install` in your terminal.
Then, to run the app run `npm run dev` and you also need to run `json-server --watch db.json` to go live with the API. 

### What this app do?

* You can see all task, grouping by: current day, week or month;
* Filter task by: Completed, Canceled and Pending;
* Create a new task, inserting a date and a name for the task. Calm, later you will be able to insert more info about your task, like description :)
* Cancel a created task;
* Edit a created task. In this step its able to give more information for your task, like description, remimber minute, change the name and the date;
* For now, we have this features development.

> For now, we have one critical bug. If you set a new task filter by status (Cancelado, Concluído ou Pendente), the changes will not show up. You need to change the period also. My bad :/

### Used libraries

I used those libraries to help me with the development.

* [SweetAlert2]
* [vue-sweetAlert]
* [moment.js]
* [semantic-ui-vue2]
* [SemanticUI]

[Vue.js]: <https://vuejs.org/>
[SweetAlert2]: <http://t4t5.github.io/sweetalert/>
[vue-sweetAlert]: <https://www.npmjs.com/package/vue-sweetalert>
[moment.js]: <http://momentjs.com/>
[semantic-ui-vue2]: <https://github.com/almino/semantic-ui-vue2>
[SemanticUI]: <https://semantic-ui.com/>
