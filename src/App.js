import './App.css';
import {Header} from './components/Header/Header';
import {Table} from './components/Table/Table';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchAuthMe} from './redux/slices/auth';
import {fetchTasks} from './redux/slices/tasks';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks())
        dispatch(fetchAuthMe())
    }, [])

    return (
        <div className="App">
            <Header/>
            <Table/>
        </div>
    );
}

export default App;
