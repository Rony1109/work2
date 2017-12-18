host_list=(
"192.168.1.67"
"192.168.1.68"
)

for host in ${host_list[@]}
do
  exec_shell="$exec_shell cd /data/pywork/cuteSpider;"
  exec_shell="$exec_shell sh hcantProductPageMax.sh $1;"
  ssh root@${host} $exec_shell
done

