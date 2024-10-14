import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
)

export default async function handler(req,res) {
    if(req.method=='POST'){
        const {originalUrl} = req.body;
        console.log(originalUrl)
        const id = nanoid(8);
        if(!supabase){
            console.log('account not created');
        }
        const {data,error} = await supabase
        .from('urls')
        .insert([{id,original_url:originalUrl}])
        .single();

        console.log(data);
        if(error) {
            return res.status(500).json({error: 'Failed to create short URL'});
        } else {
            const shortUrl = `${req.headers.host}/${data.id}`;
            res.status(201).json({shortUrl})
        }
    } else {
        res.status(500).json({error: 'Method not allowed'});
    }
}