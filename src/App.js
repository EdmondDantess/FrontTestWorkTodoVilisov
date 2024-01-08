import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAuthMe, selectIsAuth} from './redux/slices/auth';
import {useEffect} from 'react';
import {Header} from './components/Header/Header';
import {Table} from './components/Table/Table';

function App() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    useEffect(() => {
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
