import {Component} from "react";

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            data : [
                {name:'Бульдог Харламов', salary: 2100, increase: true, rise: true, id: 1},
                {name:'Павел Воля', salary: 2500, increase: false, rise: false, id: 2},
                {name:'Денис Карибидис', salary: 3000, increase: false, rise: false, id: 3},
            ]
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data})=>{
            return{
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name: name,
            salary: salary,
            increase: false,
            rise: false,
            id: this.maxId++
        };
        if (newItem.name !== '' && newItem.salary !== '') {
            this.setState(({data}) => {
                return {
                    data: [...data, newItem]
                }
            })
        }
    }

    onToggleIncrease = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, increase: !old.increase};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return{
                data: newArr
            }
        })
    }

    onToggleRise = (id) => {
        this.setState((({data}) => ({
            data: data.map(item => {
                if(item.id === id){
                    return{...item, rise: !item.rise}
                }
                return item;
            })
        })))
    }


    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;

        return (
            <div className="app">
                <AppInfo employees={employees}
                         increased={increased}/>

                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>

                <EmployersList
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise} />
                <EmployersAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;