import app from './app'
import cors from 'cors'
const port = 8080 // default port to listen

app.use(cors())
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
