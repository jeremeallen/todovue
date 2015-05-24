/**
 * Created by jeremeallen on 5/24/15.
 */

var data_json = JSON.parse(localStorage.getItem("tasks")) || [];

new Vue({
    el: '#tasks',
    data: {
        tasks: data_json,
        newTask: ''
    },

    filters: {
      inProcess: function(tasks) {
          return tasks.filter(function(task){
              return !task.completed;
          });
      }
    },

    computed: {
        completions: function(){
            return this.tasks.filter(function(task){
                return task.completed;
            });
        },
        remaining: function(){
            return this.tasks.filter(function(task){
                return !task.completed;
            });
        }
    },

    methods: {
        addTask: function(e) {

            e.preventDefault();

            if (!this.newTask) return;

            this.tasks.push({
                body: this.newTask,
                completed: false
            });

            this.newTask = '';

            this.updateLocalDb(); //Must be able to watch for the model change and fire this from one spot....
        },

        removeTask: function(task) {
            this.tasks.$remove(task);

            this.updateLocalDb();  //Must be able to watch for the model change and fire this from one spot....
        },

        editTask: function(task) {
            this.removeTask(task);
            this.newTask = task.body;
            this.$$.newTask.focus();

            this.updateLocalDb();  //Must be able to watch for the model change and fire this from one spot....
        },

        toggleTaskCompletion: function(task) {
            task.completed = !task.completed;

            this.updateLocalDb();  //Must be able to watch for the model change and fire this from one spot....
        },

        completeAll: function(){
            this.tasks.forEach(function(task){
                task.completed = true;

            });

            this.updateLocalDb();  //Must be able to watch for the model change and fire this from one spot....
        },

        clearCompleted: function() {
            this.tasks.forEach(function(task){
                task.completed = false;

            });

            this.updateLocalDb();  //Must be able to watch for the model change and fire this from one spot....
        },

        updateLocalDb: function() {
            var dataToStore = JSON.stringify(this.tasks);
            localStorage.setItem('tasks', dataToStore);
        }
    }
})
