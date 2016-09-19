import boto3
import time

#now that the tests have passed on the dev alias,
#change the prod alias to be the same value as the dev alias
#lambda function name to update
func = "hello_there"

client = boto3.client('lambda')

#get the version number that 'dev' alias points to:
devResponse = client.get_alias(FunctionName=func , Name='dev')
print "Dev alias details: " + str(devResponse)
devVersion = devResponse.get('FunctionVersion')

#update the 'prod' alias to the same version as 'dev'
print "Updating Production version to v " + str(devVersion)
updateResponse = client.update_alias(
    FunctionName=func,
    Name='prod',
    FunctionVersion=devVersion,
    Description='Production Alias'
)
