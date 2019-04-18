angular.module('myApp')
  .directive('meetingInfo', ['$window', function ($window) {
    return {
      templateUrl: 'meeting-info.template.html',
      restrict: 'E',
      controller: ['$scope', '$rootScope', MeetingInfoController],
    };

    function MeetingInfoController($scope, $rootScope) {
      $scope.meetingInfoTitlesArr = [
        {name: '会议名称', keyName: 'name'},
        {name: '所属部门', keyName: 'department'},
        {name: '会议性质', keyName: 'type'},
        {name: '会议级别', keyName: 'level'},
        {name: '开会时间', keyName: 'startTime'},
        {name: '会议时长', keyName: 'duration'},
        {name: '会议室', keyName: 'meetingRoom'},
      ];
      $scope.roomInfoTitlesArr = [
        {name: '会议室', keyName: 'name'},
        {name: '开会地点', keyName: 'location'},
        {name: '类型', keyName: 'type'},
        {name: '参会人数', keyName: 'participantsNum'},
      ];
      $scope.personInfoTitlesArr = [
        {name: '姓名', keyName: 'name'},
        {name: '所属部门', keyName: 'department'},
        {name: '联系电话', keyName: 'phone'},
      ];
      $scope.approvalTitlesArr = [
        {name: '审批人', keyName: 'name'},
        {name: '状态', keyName: 'status'},
        {name: '描述', keyName: 'desc'},
      ];
      $scope.meetingDetailArr = {
        '1': {
          meetingInfo: {
            name: '德阳会议01',
            department: '德阳/实施部',
            type: '本地会议',
            level: 'C',
            startTime: new Date(),
            duration: '2小时30分钟',
            meetingRoom: '德阳会议室1',
            meetingRequirements: '综合样本、笔、纸、矿泉水',
            tips: '有领导参加，需要提前调试'
          },
          meetingRoomDetail: [
            {
              name: '成都会议室1',
              location: '成都',
              type: '视频会议室',
              participantsNum: 50
            },
            {
              name: '自贡会议室1',
              location: '自贡',
              type: '视频会议室',
              participantsNum: 30
            },
            {
              name: '德阳会议室1',
              location: '德阳',
              type: '视频会议室',
              participantsNum: 5
            }
          ],
          participantsInfo: [
            {
              name: '小明',
              department: '德阳/实施部',
              phone: '12388888888'
            },
            {
              name: '小红',
              department: '德阳/实施部',
              phone: '12388888888'
            }
          ],
          meetingContacts: [
            {
              name: '小王',
              department: '德阳/实施部',
              phone: '12388888888'
            }
          ],
          approvalProcess: {
            '01': {
              name: '小明',
              status: '通过',
              desc: ''
            },
            '02': {
              name: '小红',
              status: '待定',
              desc: ''
            }
          }
        },
        '2': {
          meetingInfo: {
            name: '自贡会议02',
            department: '自贡/实施部',
            type: '本地会议',
            level: 'C',
            startTime: new Date(),
            endTime: new Date(),
            meetingRoom: '自贡会议室1',
            meetingRequirements: '综合样本、笔、纸、矿泉水',
            tips: '有领导参加，需要提前调试'
          },
          meetingRoomDetail: [
            {
              name: '成都会议室1',
              location: '成都',
              type: '视频会议室',
              participantsNum: 10
            },
            {
              name: '自贡会议室1',
              location: '自贡',
              type: '视频会议室',
              participantsNum: 20
            },
            {
              name: '德阳会议室1',
              location: '德阳',
              type: '视频会议室',
              participantsNum: 50
            }
          ],
          participantsInfo: [
            {
              name: '小明',
              department: '自贡/实施部',
              phone: '12388888888'
            },
            {
              name: '小红',
              department: '自贡/实施部',
              phone: '12388888888'
            }
          ],
          meetingContacts: [
            {
              name: '小王',
              department: '自贡/实施部',
              phone: '12388888888'
            }
          ],
          approvalProcess: {
            '01': {
              name: '小明明',
              status: '待定',
              desc: ''
            },
            '02': {
              name: '小红红',
              status: '通过',
              desc: ''
            }
          }
        },
      };
      $scope.meetingId = '';
      $scope.tab = 'meetingDetail'; // 'meetingDetail' 或 'approvalProcess'
      $scope.changeTab = function(tabName) {
        $scope.tab = tabName;
      };
      $rootScope.$on('SHOW_MEETING_INFO', function(event, newId) {
        $scope.meetingId = newId;
        $scope.meetingDetail = $scope.meetingDetailArr[newId];
        $scope.tab = 'meetingDetail';
        $('#meetingInfoModal').modal(); // 打开弹窗
      });
    }
  }]);
