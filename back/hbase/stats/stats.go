package stats

import (
	"github.com/tsuna/gohbase/filter"
	"github.com/lulunevermind/bioviewer/back/logger"
)

func NewStatsFilterList(opts ...func(*filter.List)) *filter.List {
	filterList := filter.NewList(1)
	for _, option := range opts {
		option(filterList)
	}
	return filterList
}

func OptionUserPrefixFilter(intKey []byte) func(*filter.List) {
	pf := filter.NewPrefixFilter(intKey)
	logger.Slog.Infow("Добавляем фильтр по префиксу ключа в список фильтров",
		"intKey", intKey)
	return func(fl *filter.List) {
		fl.AddFilters(pf)
	}
}
