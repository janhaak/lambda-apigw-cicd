import boto3
import time

#make it work in Jenkins
sys.path.append(os.environ['WORKSPACE'])

#now that the tests have passed on the dev alias,
#change the prod alias to be the same value as the dev alias
func = "hello_there"
client = boto3.client('lambda')
devResponse = client.get_alias(FunctionName=func , Name='dev')
print "Dev alias details: " + str(devResponse)
devVersion = devResponse.get('FunctionVersion')
print "Updating Production version to v " + str(devVersion)
updateResponse = client.update_alias(
    FunctionName=func,
    Name='prod',
    FunctionVersion=devVersion,
    Description='Production Alias'
)
