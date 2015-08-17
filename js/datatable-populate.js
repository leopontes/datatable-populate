
var component = angular.module('datatable-populate', ['datatables']);

component.directive('dtPopulate', function() {
	return {
		restrict: 'A',
		replace: false,
		transclude: true,
		link: function($scope, $element, $attrs){
			$element.dataTable({
				aaSorting: [],
				bPaginate: true,
				data: $scope.produtos,
				columns: [{title: "Nome", data: "nome"},
				          {title: "Descricao", data: "descricao"}],
				oLanguage:{
					sLoadingRecords: "Processando",
					sZeroRecords:"Nenhum registro encontrado...",
					oPaginate: {                                         
						sFirst:    "Primeira",
						sPrevious: "Anterior",
						sNext:     "Seguinte",
						sLast:     "Última"   
					},
				},
				sDom: 'lrtip'
			});
		}
	}
});