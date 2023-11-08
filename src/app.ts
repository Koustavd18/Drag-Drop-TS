(function (){
    console.log('My First TS project');
}())

// _____________XXX- START OF PROJECT -XXX_____________

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    TitleInputElement : HTMLInputElement;
    DescriptionInputElement: HTMLInputElement;
    PeopleInputElement: HTMLInputElement;


    constructor(){
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';
        this.TitleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.DescriptionInputElement = <HTMLInputElement>this.element.querySelector("#description");
        this.PeopleInputElement = <HTMLInputElement>this.element.querySelector("#people");

        this.configure();
        this.attach();
    }

    private gatherUserInput() : [string, string, number] | void {
        const enteredTitle = this.TitleInputElement.value;
        const enteredDescription = this.DescriptionInputElement.value;
        const enteredPeople = this.PeopleInputElement.value;

        if(enteredTitle.trim().length === 0 ||
           enteredDescription.trim().length === 0 ||
           enteredPeople.trim().length === 0 ){
            alert("Incorrect inputs. Check your values");
            return;
           } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
           }

    }

    private clearInput() {
        this.TitleInputElement.value= '';
        this.DescriptionInputElement.value = '';
        this.PeopleInputElement.value = '';
    }

    private submitHandler(e:Event) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)){
            const [title, description, people] = userInput;
            console.log(title, description, people);
        }
        
        this.clearInput();

    }

    private configure(){
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin',this.element);
    }
}

const prjInput = new ProjectInput;