export default function handleReset(state: any) {
    let field: keyof (typeof state);
    for(field in state) {
        state[field] = '';
    }
}