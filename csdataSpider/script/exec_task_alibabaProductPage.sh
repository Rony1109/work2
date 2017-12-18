host_list=(
"192.168.1.67"
"192.168.1.68"
"192.168.1.69"
)

for host in ${host_list[@]}
do
  exec_shell="$exec_shell cd /data/pywork/cuteSpider;"
  exec_shell="$exec_shell sh alibabaProductPage.sh $1;"
  ssh root@${host} $exec_shell
done

