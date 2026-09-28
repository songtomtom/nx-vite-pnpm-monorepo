import {useEffect, useMemo, useState, type FormEvent} from 'react';
import {Button, Card} from '@board/ui';
import {COLUMNS, addTask, moveTask, tasksIn, type Board, type Column} from '@board/board-core';
import {loadBoard, saveBoard} from '@board/api-client';

export function BoardView() {
    const [board, setBoard] = useState<Board>({tasks: []});
    const [title, setTitle] = useState('');
    const [counts, setCounts] = useState<Record<string, number>>({});
    const worker = useMemo(
        () => new Worker(new URL('./stats.worker.ts', import.meta.url), {type: 'module'}),
        []
    );

    useEffect(() => {
        worker.onmessage = (e: MessageEvent<Record<string, number>>) => setCounts(e.data);
        worker.postMessage(board);
    }, [board, worker]);

    useEffect(() => {
        loadBoard().then(setBoard);
    }, []);

    const update = (next: Board) => {
        setBoard(next);
        void saveBoard(next);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        update(addTask(board, title));
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit} style={{marginBottom: 12}}>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="할 일" />
                <Button type="submit">추가</Button>
            </form>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12}}>
                {COLUMNS.map(column => (
                    <Card key={column} title={`${column} (${counts[column] ?? 0})`}>
                        {tasksIn(board, column).map(task => (
                            <div key={task.id} style={{margin: '6px 0'}}>
                                {task.title}{' '}
                                {COLUMNS.filter(c => c !== column).map((to: Column) => (
                                    <Button key={to} onClick={() => update(moveTask(board, task.id, to))}>
                                        → {to}
                                    </Button>
                                ))}
                            </div>
                        ))}
                    </Card>
                ))}
            </div>
        </div>
    );
}
