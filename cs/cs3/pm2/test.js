{
  "apps":
  {
    "name": "test",
      "cwd": "/data/wwwroot/nodejs",
      "script": "./test.sh",
      "exec_interpreter": "nodejs",
      "min_uptime": "60s",
      "max_restarts": 30,
      "exec_mode" : "cluster_mode",
      "error_file" : "./test-err.log",
      "out_file": "./test-out.log",
      "pid_file": "./test.pid"
    "watch": true
  }
}