export const fileToUri = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        // @ts-ignore
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})