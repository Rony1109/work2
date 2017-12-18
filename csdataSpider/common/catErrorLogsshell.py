import subprocess,sys,os

pathdir = "/data/logs/"

if len(sys.argv)>1:
    shellarr=sys.argv[1:]
    shellarr = [pathdir+i+'.log' for i in shellarr]
    pass
else:
    shellarr = []
    for parent, dirnames, filenames in os.walk(pathdir):
        for filename in filenames:
            shellarr.append(os.path.join(parent, filename))


for file in shellarr:
    s = subprocess.Popen('cat  ' + file, shell=True, stdout=subprocess.PIPE)
    outtext = s.stdout.read()
    if len(outtext) > 0:
        print("The file name is: " + file)
        print(outtext)
        print("")
        subprocess.Popen('> ' + file, shell=True, stdout=None)





