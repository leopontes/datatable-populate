
angular.module('datatable-populate', [])
       .constant('MODULE_VERSION', '0.0.1')
       .value('defaults', {
    	   
       })
       .factory('DATATABLEFACTORY', function(){})
       .directive('dtPopulate', function(){
			return{
				link: function($scope, $element, $attrs){
					
					var columns = $.map($element.find('th'), function(th){
						if(th && $(th).attr("dt-data")){
							return {title: $(th).text(), data: $(th).attr("dt-data")};
						}
					});
					
					function addCRUDButons(row){
						var edit       = $(document.createElement('a'));
						var remove     = $(document.createElement('a'));
						var spanEdit   = $(document.createElement('span'));
						var spanRemove = $(document.createElement('span'));
						var td         = $(document.createElement('td'));
						
						$(spanEdit).addClass('glyphicon glyphicon-pencil');
						$(spanRemove).addClass('glyphicon glyphicon-trash');
						
						$(spanEdit).attr('aria-hidden', 'true');
						$(spanRemove).attr('aria-hidden', 'true');
						
						$(edit).addClass('btn btn-warning btn-sm');
						$(remove).addClass('btn btn-danger btn-sm');
						
						$(edit).attr("role", "button");
						$(remove).attr("role", "button");
						
						$(edit).append(spanEdit);
						$(remove).append(spanRemove);
						
						$(td).append(edit);
						$(td).append(remove);
						$(td).addClass('align-center');
						
						$(row).append(td);
					}
					
					var table = $element.DataTable({
						data: $scope.$eval($attrs.dtData),
						sorting: [],
						sDom: 'rtip',
						columns:columns,
						createdRow: function(row, data, index){
							if($attrs.dtCrudtable){
								addCRUDButons(row);
							}
						}
					});
					
					$scope.$watch($attrs.dtData, function(value){
						var val = value || null;
						/*if(val){
							table.clear();
							table.row.add($scope.$eval($attrs.dtData)).draw();
						}*/
					});
				}
			}
	});