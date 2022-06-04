import boto3
client = boto3.client('s3', region_name='us-east-1')
for i in range(10):
    client.upload_file(str(i)+'.png', 'scale1to10223b7f5797fd44bc9c60facc1a8348a6205400-dev', 'public/'+str(i)+'.png')