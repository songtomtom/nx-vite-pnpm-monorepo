import {useEffect, useState} from 'react';
import {Card} from '@board/ui';
import {COLUMNS, tasksIn, type Board} from '@board/board-core';
import {loadBoard} from '@board/api-client';

/** 두 번째 앱. 같은 도메인·저장소를 읽어 열별 개수만 보여 준다. */
export function App() {
    const [board, setBoard] = useState<Board>({tasks: []});
    useEffect(() => {
        loadBoard().then(setBoard);
    }, []);
    return (
        <main style={{fontFamily: 'sans-serif', padding: 16}}>
            <h1>admin</h1>
            {COLUMNS.map(column => (
                <Card key={column} title={column}>
                    <p>{tasksIn(board, column).length}개</p>
                </Card>
            ))}
        </main>
    );
}
