import type {ButtonHTMLAttributes} from 'react';

/** 앱 전체에서 쓰는 기본 버튼. 도메인을 모른다. */
export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props} style={{padding: '4px 10px', borderRadius: 4, ...props.style}} />;
}
