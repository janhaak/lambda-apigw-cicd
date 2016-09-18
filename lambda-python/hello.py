from __future__ import print_function

import json

print('Loading function')




def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))

    this will break the build!!!!

    print("value1 = " + event['key1'])
    print("value2 = " + event['key2'])
    print("value3 = " + event['key3'])
    return event['key1'] + " deploy slower"  # Echo back the first key value
    #raise Exception('Something went wrong')
