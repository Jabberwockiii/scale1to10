import boto3
client = boto3.client('s3', region_name='us-east-1')
for i in range(100):
    client.upload_file("./pythonScrapt/archived/"+str(i)+'.png', 'scale1to10223b7f5797fd44bc9c60facc1a8348a6170543-environ', 'public/'+str(i)+'.png')