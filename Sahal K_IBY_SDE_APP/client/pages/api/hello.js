// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function Handler(req,res){
    const {method} =req;

    if(method==='GET'){
      if(req.query?.id) {
        console.log('called')
        const token=req.query?.id
        res.setHeader(
          'Set-Cookie',
          `session=${encodeURIComponent(JSON.stringify({ token }))}; HttpOnly; Path=/`
        );
      }
      res.status(200).json({ message: 'Login successful.' });
  }
}