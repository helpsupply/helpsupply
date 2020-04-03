from subprocess import Popen, PIPE, STDOUT
import re
import time
import os
import sys

# Start up the LocalTunnel and extract the forwarded host
tunnel = Popen(["lt", "-h", "http://serverless.social", "-p", "5001"], stdout=PIPE)
tunnelurl = re.search("(?P<url>https?://[^\s]+)", tunnel.stdout.readline()).group("url")
print("Exposed URL", tunnelurl)

# Push to twilio with this new URL
my_env = os.environ.copy()
my_env["HELP_SUPPLY_HOST"] = tunnelurl
push = Popen(["node", "deploychatflow.js"], env=my_env)
while push.poll() == None:
    time.sleep(1)

print("Hit Control-C to quit")
emulators = Popen(["firebase", "emulators:start"], env=my_env)
while True: 
    command = sys.stdin.readline()
    if command == 'q':
        break
    if command == 'u':
        push = Popen(["node", "deploychatflow.js"], env=my_env)
        while push.poll() == None:
            time.sleep(1)

