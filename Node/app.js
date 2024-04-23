const express = require('express');
const app = express();
const cors = require('cors')
const router = require('./router');
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    "Access-Control-Allow-Origin":"*"
}));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
