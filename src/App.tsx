import {BoardView} from './features/board/BoardView';

export function App() {
    return (
        <main style={{fontFamily: 'sans-serif', padding: 16}}>
            <h1>board</h1>
            <BoardView />
        </main>
    );
}
