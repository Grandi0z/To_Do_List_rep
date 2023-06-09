export default class Task {
    constructor(description, completed,index) {
        this.description = description
        this.completed = completed
        this.index = index;
        this.element = {}
        this.element.id = `task_${Math.floor(Math.random() * 100000)}`
        this.element.description = this.description
        this.element.completed = this.completed
        this.element.index = this.index

        this.element.root = Task.createRoot()

        this.element.taskItemText = this.element.root.querySelector(".task_item_text")
        this.element.taskItemCheck = this.element.root.querySelector(".task_item_check")
        this.element.taskItemBtn = this.element.root.querySelector(".task_item_btn")
        this.element.taskItemBtnTrash = this.element.root.querySelector("tast_item_btn_trash")
    }

    static createRoot = () => {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
            <div class="task_item" draggable='true'>
                <input class="form-check-input task_item_check" type="checkbox" value="" id="flexCheckChecked" checked>
                <p class="task_item_text" contenteditable>Task 1</p>
                <button class="btn btn-outline-secondary task_item_btn"><i class="bi bi-three-dots-vertical"></i></button>
                <button class="btn btn-outline-secondary tast_item_btn_trash"><i class="bi bi-trash3-fill"></i></button>
            </div>
          `).children[0];
      }
}