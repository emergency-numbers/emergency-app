
CSS = $(shell find app -iname "*.mcss")
SRC:= $(shell find -E app -regex '.*(html|js|js(on)?)$$')
SRC+= $(CSS:%.mcss=%.css)


public: components $(SRC)
	@component build --use component-autoboot --out public --name emergency

components: component.json $(shell find app -name "component.json")
	@component install

%.css: %.mcss
	@myth $< $@

clean:
	rm -fr components public


.PHONY: clean

