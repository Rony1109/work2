host_list=(
"192.168.1.67"
"192.168.1.68"
"192.168.1.69"
"192.168.1.70"
"192.168.1.71"
"192.168.1.72"
"192.168.1.73"
"192.168.1.74"
"192.168.1.75"
)

for host in ${host_list[@]}
do
  exec_shell="$exec_shell cd /data/pywork/cuteSpider;"
  exec_shell="$exec_shell sh alibabaContact.sh $1;"
  ssh root@${host} $exec_shell
done

