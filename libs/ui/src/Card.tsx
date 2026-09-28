import type {ReactNode} from 'react';

export function Card({title, children}: {title: string; children?: ReactNode}) {
    return (
        <section style={{border: '1px solid #ccc', borderRadius: 6, padding: 8, marginBottom: 8}}>
            <strong>{title}</strong>
            {children}
        </section>
    );
}
