
COMPONENT = node_modules/.bin/component
MYTH = node_modules/.bin/myth
SRC = component.json lib/boot/index.js lib/boot/template.js
SRC+= lib/boot/emergency.css lib/boot/component.json


public: components $(SRC)
	@$(COMPONENT) build --use component-autoboot --out public --name emergency

components:
	@$(COMPONENT) install

%.js: %.html
	@$(COMPONENT) convert $<

%.css: %.mcss
	@$(MYTH) $< $@

clean:
	rm -fr components
	rm public/emergency.{css,js}


.PHONY: clean public

