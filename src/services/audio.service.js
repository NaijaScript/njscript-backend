
export async function queryAudioModel(data) {
  const response = await fetch(
    "https://z880jmgqs3m4fh1q.us-east-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  
  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.statusText}`);
  }

  return await response.json();
}
