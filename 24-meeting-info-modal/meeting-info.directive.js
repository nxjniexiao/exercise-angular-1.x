angular.module('myApp')
  .directive('meetingInfo', ['$window', function ($window) {
    return {
      templateUrl: 'meeting-info.template.html',
      transclude: true,
      restrict: 'A',
      controller: ['$scope', MeetingInfoController],
    };

    function MeetingInfoController($scope) {
      $scope.meetingDetailArr = {
        '1': {
          meetingInfo: {
            name: '德阳会议01',
            department: '德阳/实施部',
            type: '本地会议',
            level: 'C',
            startTime: new Date(),
            endTime: new Date(),
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
          ]
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
          ]
        },
      };
      $scope.titlesInMeetingInfo = {
        name: '会议名称',
        department: '所属部门',
        type: '会议性质',
        level: '会议级别',
        startTime: '开会时间',
        endTime: '会议时长',
        meetingRoom: '会议室',
        meetingRequirements: '会议要求'
      };
      $scope.meetingId = 'initialId';
      // 暴露供外部使用的API
      this.changeId = function (newId) {
        console.log(newId + ' test');
        $scope.meetingId = newId;
        $scope.meetingDetail = $scope.meetingDetailArr[newId];
        $scope.$apply();
      };
    }
  }]);
