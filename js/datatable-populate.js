angular.module('datatable-populate', [])
       .constant('MODULE_VERSION', '0.0.1')
       .value('defaults', {

       })
       .provider('TableOptions', function TableOptionsProvider(){
    	   this.options = {
				sorting: [],
				sDom: 'rtip'
			};

    	   this.setOptions = function(options) {
    	        if (!angular.isObject(options)) throw new Error("Options should be an object!");
    	        this.options = angular.extend({}, this.options, options);
    	    };

    	   this.$get = function(){
    		   return this.options;
    	   };
       })
       .directive('dtPopulate', ['TableOptions', function(TableOptions){
			return{
				link: function($scope, $element, $attrs){
					var columns = $.map($element.find('th'), function(th){
						if(th && $(th).attr("dt-data")){
							return {title: $(th).text(), data: $(th).attr("dt-data")};
						}
					});

					function addCRUDButons(row, data){
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

						edit.on('click', function(){
							if($scope.update){
								$scope.update(data);
							}
						});

						remove.on('click', function(){
							if($scope.delete){
								$scope.delete(data);
							}
						});

						$(edit).append(spanEdit);
						$(remove).append(spanRemove);

						$(td).append(edit);
						$(td).append(remove);
						$(td).addClass('align-center');

						$(row).append(td);
					}

					var defaultOptions = {
						data: $scope.$eval($attrs.dtData),
						columns:columns,
						createdRow: function(row, data, index){
							if($attrs.dtCrudtable){
								addCRUDButons(row, data);
							}
						}	
					};

					var options = angular.extend({}, defaultOptions, TableOptions);

					var table = $element.DataTable(options);

					$scope.$watch($attrs.dtData, function(value){
						var val = value || null;
						if(val){
							table.clear();
							table.rows.add($scope.$eval($attrs.dtData)).draw();
						}
					});
				}
			}
	}]); 