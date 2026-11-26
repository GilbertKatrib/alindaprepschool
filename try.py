'''import qrcode
url = "https://youtube.com"
img = qrcode.make(url)
img.save("qr.png")'''


#wifi scanner\
    
import subprocess
result =subprocess.check_output("netsh wlan show networks mode=bssid", 
                                shell=True).decode(errors="ignore")
print(result)


#py keywords
import keyword
print(keyword.kwlist)