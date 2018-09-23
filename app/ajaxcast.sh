[[ -z ${GET['machine_id']} ]] && return

[[ ${GET['action']} == "play" ]] && echo "publish cast.event.game.${GET['machine_id']} '{ \"cast\": \"play\" }'" | telnet v-1534323233-382.qual.yoctu.ovh 6379 > /dev/null

[[ ${GET['action']} == "spin" ]] && echo "publish cast.event.spin.${GET['machine_id']} '{ \"cast\": \"spin\" }'" | telnet v-1534323233-382.qual.yoctu.ovh 6379 > /dev/null

[[ ${GET['action']} == "maxbet" ]] && echo "publish cast.event.maxbet.${GET['machine_id']} '{ \"cast\": \"maxbet\" }'" | telnet v-1534323233-382.qual.yoctu.ovh 6379 > /dev/null

[[ ${GET['action']} == "info" ]] && echo "publish cast.event.info.${GET['machine_id']} '{ \"cast\": \"info\" }'" | telnet v-1534323233-382.qual.yoctu.ovh 6379 > /dev/null


