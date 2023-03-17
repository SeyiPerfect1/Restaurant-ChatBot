const { createHmac } = await import('node:crypto');
import * as dotenv from "dotenv";
dotenv.config();

const encrypt = (data) => {
    const secret = process.env.HASH_SECRET;
    const hash = createHmac('sha256', secret)
                   .update(data)
                   .digest('hex');
    console.log(hash);
}
